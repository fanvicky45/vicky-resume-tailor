// Only the development server on a loopback address skips the pilot gate.
export function requiresPilotCode(url:string,development:boolean){
 const host=new URL(url).hostname;
 return !(development&&['localhost','127.0.0.1','[::1]'].includes(host));
}
