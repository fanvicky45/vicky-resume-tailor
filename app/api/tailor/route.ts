import {generateWithEvidenceRepair,repairInstructions} from '../../../lib/evidence-repair';
import { allowedOrigin } from '../../../lib/allowed-origin';
import { requiresPilotCode } from '../../../lib/pilot-access';
import { env } from 'cloudflare:workers';
import { providerFailure } from '../../../lib/provider-errors';
import { schema, instructions, type CV } from '../../../lib/tailor';
const json=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
const config=()=>env as unknown as {OPENAI_API_KEY?:string;OPENAI_MODEL?:string;TAILOR_ACCESS_CODE?:string;API_ALLOWED_ORIGIN?:string};
const pilotRequired=(req:Request)=>requiresPilotCode(req.url,process.env.NODE_ENV==='development');
export function GET(req:Request){const e=config();const pilot=pilotRequired(req);return json({ready:!!(e.OPENAI_API_KEY&&e.OPENAI_MODEL&&(!pilot||e.TAILOR_ACCESS_CODE)),pilot});}
const limits=new Map<string,{count:number;until:number}>();
export async function POST(req:Request){
 const e=config();if(!e.OPENAI_API_KEY||!e.OPENAI_MODEL||(pilotRequired(req)&&!e.TAILOR_ACCESS_CODE))return json({error:'AI tailoring is not connected yet. You can still try the fictional example and download its PDF.'},503);
 if(!allowedOrigin(req,e.API_ALLOWED_ORIGIN))return json({error:'Please use the form on this website.'},403);
 if(!req.headers.get('content-type')?.includes('application/json'))return json({error:'Expected a JSON request.'},415);
 if(Number(req.headers.get('content-length')||0)>220000)return json({error:'Your input is too large.'},413);
 let input;try{const raw=await req.text();if(raw.length>200000)return json({error:'Your input is too large.'},413);input=JSON.parse(raw);}catch{return json({error:'Could not read the application. Please try again.'},400);}
 if(!input||typeof input!=='object'||Array.isArray(input))return json({error:'Expected an application object.'},400);
 if(pilotRequired(req)&&input.accessCode!==e.TAILOR_ACCESS_CODE)return json({error:'Enter the pilot access code provided by the owner.'},401);
 if(typeof input.resume!=='string'||input.resume.length<100||input.resume.length>100000||typeof input.jd!=='string'||input.jd.length<100||input.jd.length>60000)return json({error:'Add your complete resume and a full job description (at least 100 characters each).'},400);
 const key=req.headers.get('cf-connecting-ip')||'preview';const now=Date.now();for(const [k,v] of limits)if(v.until<now)limits.delete(k);if(limits.size>10000)return json({error:'The pilot is busy. Please try later.'},429);const limit=limits.get(key)||{count:0,until:now+60000};if(++limit.count>3)return json({error:'Please wait a minute before generating another CV.'},429);limits.set(key,limit);
 try{
  const cv=await generateWithEvidenceRepair(input.resume,async repair=>{
  const upstream=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'Authorization':`Bearer ${e.OPENAI_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model:e.OPENAI_MODEL,store:false,instructions:instructions+(repair?'\n'+repairInstructions:''),input:JSON.stringify({master_resume:input.resume,job_description:input.jd}),text:{format:{type:'json_schema',name:'tailored_cv',strict:true,schema}},max_output_tokens:6500}),signal:AbortSignal.timeout(90000)});
  if(!upstream.ok){const failure=providerFailure(upstream.status,await upstream.json().catch(()=>null));throw Object.assign(new Error(failure.error),{status:failure.status});}
  const data=await upstream.json() as {output?:{content?:{type:string;text?:string}[]}[];status?:string};
  if(data.status==='incomplete')throw Object.assign(new Error('The AI response was incomplete. Shorten your input and try again.'),{status:502});
  const text=data.output?.flatMap(o=>o.content||[]).filter(c=>c.type==='output_text').map(c=>c.text||'').join('');
  return JSON.parse(text || "") as CV;
  });
  if(!cv)return json({error:'We could not verify the draft against your resume, even after an automatic retry. Your inputs are saved in this tab. Check the extracted resume text for missing or garbled content, then try again. No unverified draft was exported.'},422);
  return json({cv});
 }catch(error){if(error instanceof Error&&'status' in error)return json({error:error.message},Number(error.status));return json({error:'Generation did not finish. Your resume stays in this tab; please try again.'},502);}
}
