import {evidenceErrors,type CV} from './tailor.ts';
export async function generateWithEvidenceRepair(resume:string,generate:(repair:boolean)=>Promise<CV>){
 for(let attempt=0;attempt<2;attempt++){
  const cv=await generate(attempt===1);
  if(evidenceErrors(cv,resume).length===0)return cv;
 }
 return null;
}
export const repairInstructions='A previous attempt failed exact source-quote validation. Rebuild the CV from the original master resume. Copy each bullet source as one exact contiguous excerpt from the resume, including the original punctuation and complete metric context. Do not paraphrase, splice, or add ellipses inside source. Reword or omit any bullet whose claim cannot be supported by an exact excerpt. Never invent evidence. Return the same required JSON schema.';
