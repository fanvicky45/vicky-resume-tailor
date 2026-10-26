export type Usage={day:string;count:number};
export function nextUsage(current:Usage|undefined,day:string):Usage|null{
 const count=current?.day===day?current.count:0;
 return count>=25?null:{day,count:count+1};
}
