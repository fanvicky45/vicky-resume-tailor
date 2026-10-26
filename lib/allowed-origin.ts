export function allowedOrigin(request:Request,configured?:string){
 const origin=request.headers.get('origin');
 return !!origin&&(origin===new URL(request.url).origin||!!configured&&origin===configured);
}
