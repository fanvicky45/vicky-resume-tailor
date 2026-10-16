import { env } from 'cloudflare:workers';
import { schema, instructions, evidenceErrors, type CV } from '../../../lib/tailor';
const json=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
const config=()=>env as unknown as {OPENAI_API_KEY?:string;OPENAI_MODEL?:string;TAILOR_ACCESS_CODE?:string};
export function GET(){const e=config();return json({ready:!!(e.OPENAI_API_KEY&&e.OPENAI_MODEL&&e.TAILOR_ACCESS_CODE),pilot:true});}
const limits=new Map<string,{count:number;until:number}>();
export async function POST(req:Request){
 const e=config();if(!e.OPENAI_API_KEY||!e.OPENAI_MODEL||!e.TAILOR_ACCESS_CODE)return json({error:'AI tailoring is not connected yet. Try the example or download a Codex application pack.'},503);
 if(req.headers.get('origin')!==new URL(req.url).origin)return json({error:'Please use the form on this website.'},403);
 if(!req.headers.get('content-type')?.includes('application/json'))return json({error:'Expected a JSON request.'},415);
 if(Number(req.headers.get('content-length')||0)>220000)return json({error:'Your input is too large.'},413);
 let input;try{const raw=await req.text();if(raw.length>200000)return json({error:'Your input is too large.'},413);input=JSON.parse(raw);}catch{return json({error:'Could not read the application. Please try again.'},400);}
 if(input.accessCode!==e.TAILOR_ACCESS_CODE)return json({error:'Enter the pilot access code provided by the owner.'},401);
 if(typeof input.resume!=='string'||input.resume.length<100||input.resume.length>100000||typeof input.jd!=='string'||input.jd.length<100||input.jd.length>60000)return json({error:'Add your complete resume and a full job description (at least 100 characters each).'},400);
 const key=req.headers.get('cf-connecting-ip')||'preview';const now=Date.now();for(const [k,v] of limits)if(v.until<now)limits.delete(k);if(limits.size>10000)return json({error:'The pilot is busy. Please try later.'},429);const limit=limits.get(key)||{count:0,until:now+60000};if(++limit.count>3)return json({error:'Please wait a minute before generating another CV.'},429);limits.set(key,limit);
 try{
  const upstream=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'Authorization':`Bearer ${e.OPENAI_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model:e.OPENAI_MODEL,store:false,instructions,input:JSON.stringify({master_resume:input.resume,job_description:input.jd}),text:{format:{type:'json_schema',name:'tailored_cv',strict:true,schema}},max_output_tokens:6500}),signal:AbortSignal.timeout(90000)});
  if(!upstream.ok)return json({error:'The AI service could not complete this request. Please try again later.'},502);
  const data=await upstream.json() as {output?:{content?:{type:string;text?:string}[]}[];status?:string};
  if(data.status==='incomplete')return json({error:'The AI response was incomplete. Shorten your input and try again.'},502);
  const text=data.output?.flatMap(o=>o.content||[]).filter(c=>c.type==='output_text').map(c=>c.text||'').join('');
  const cv=JSON.parse(text || "") as CV;const errors=evidenceErrors(cv,input.resume);
  if(errors.length)return json({error:'The draft failed the source-evidence check. Please try again; no CV was exported.'},422);
  return json({cv});
 }catch{return json({error:'Generation did not finish. Your resume stays in this tab; please try again.'},502);}
}
