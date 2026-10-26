import {GET,POST} from '../app/api/tailor/route';
import {allowedOrigin} from '../lib/allowed-origin';
export default {async fetch(request:Request,env:{API_ALLOWED_ORIGIN?:string}){
 const headers=new Headers({'Cache-Control':'no-store','Vary':'Origin'});
 if(allowedOrigin(request,env.API_ALLOWED_ORIGIN)){
  headers.set('Access-Control-Allow-Origin',request.headers.get('origin')!);
  headers.set('Access-Control-Allow-Methods','GET, POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers','Content-Type');
 }
 if(new URL(request.url).pathname!=='/api/tailor')return new Response('Not found',{status:404,headers});
 if(request.method==='OPTIONS')return new Response(null,{status:allowedOrigin(request,env.API_ALLOWED_ORIGIN)?204:403,headers});
 const response=request.method==='GET'?GET(request):request.method==='POST'?await POST(request):new Response('Method not allowed',{status:405});
 for(const [key,value] of headers)response.headers.set(key,value);
 return response;
}};
