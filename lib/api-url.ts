declare global {interface Window {TAILOR_API_BASE?:string}}
export function tailorApiURL(){
 const base=typeof window==='undefined'?'':window.TAILOR_API_BASE?.trim().replace(/\/$/,'')||'';
 return base?base+'/api/tailor':'/api/tailor';
}
export function publicAsset(path:string){
 if(typeof window==='undefined')return path;
 return new URL(path.replace(/^\//,''),document.baseURI).href;
}
