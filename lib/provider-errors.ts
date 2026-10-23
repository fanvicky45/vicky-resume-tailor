// Return only controlled public messages, never raw provider response text.
export function providerFailure(status:number, body:unknown):{status:number;error:string} {
 const error = body && typeof body==='object' && 'error' in body ? (body as {error?:{code?:string;type?:string}}).error : undefined;
 if(error?.code==='credit_balance_exhausted'||error?.code==='insufficient_quota'||error?.type==='insufficient_quota') {
  return {status:503,error:'Resume generation is unavailable because the AI account has no API credits or has reached its spending limit. The site owner needs to check API billing. Your inputs remain in this tab.'};
 }
 if(status===429)return {status:429,error:'The AI service is busy. Please wait a minute and try again. Your inputs remain in this tab.'};
 if(status===401||status===403||status===404)return {status:503,error:'The AI connection needs attention from the site owner. Your inputs remain in this tab.'};
 return {status:502,error:'The AI service could not complete this request. Please try again later. Your inputs remain in this tab.'};
}
