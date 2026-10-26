import {nextUsage,type Usage} from '../lib/daily-budget';
import {DurableObject} from 'cloudflare:workers';
export class DailyBudget extends DurableObject {
 async fetch(){
  const day=new Date().toISOString().slice(0,10);
  const allowed=await this.ctx.storage.transaction(async storage=>{
   const next=nextUsage(await storage.get<Usage>('usage'),day);
   if(!next)return false;
   await storage.put('usage',next);return true;
  });
  return Response.json({allowed},{status:allowed?200:429});
 }
}
