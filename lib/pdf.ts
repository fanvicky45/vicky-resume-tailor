import { jsPDF } from 'jspdf';
import type { CV, Role } from './tailor';
export function createPDF(cv:CV){
 if(cv.education.length>2||cv.experience.length>3||cv.leadership.length>2||cv.experience.some(r=>r.bullets.length>3)||cv.leadership.some(r=>r.bullets.length>2))throw Error('The template allows at most two education entries, three professional roles with three bullets each, and two activities with two bullets each.');
 const doc=new jsPDF({unit:'pt',format:'a4'});let y=36;const left=36,width=523,line=12.5;
 const text=(s:string,size=11,bold=false,align:'left'|'center'='left')=>{doc.setFont('times',bold?'bold':'normal');doc.setFontSize(size);const lines=doc.splitTextToSize(s,width);doc.text(lines,align==='center'?297.64:left,y,{align});y+=lines.length*line+2;};
 const heading=(s:string)=>{y+=6;text(s,11,true);doc.setLineWidth(.4);doc.line(left,y-8,left+width,y-8);y+=2;};
 const row=(a:string,b:string,bold=false,italic=false)=>{doc.setFont('times',italic?'italic':bold?'bold':'normal');doc.setFontSize(11);const bw=doc.getTextWidth(b);const available=width-(b?bw+10:0);if(doc.getTextWidth(a)>available)throw Error('A heading is too long. Shorten the organisation, title, qualification, or dates.');doc.text(a,left,y);if(b)doc.text(b,left+width,y,{align:'right'});y+=14;};
 const role=(r:Role)=>{y+=4;row(r.organisation,r.location,true);row(r.title,r.dates,false,true);for(const b of r.bullets){doc.setFontSize(11);const tokens=[...b.lead.split(/\s+/).filter(Boolean).map(s=>({s,bold:true})),...b.text.split(/\s+/).filter(Boolean).map(s=>({s,bold:false}))];const rows:{s:string;bold:boolean;w:number}[][]=[[]];let used=0;for(const token of tokens){doc.setFont('times',token.bold?'bold':'normal');const w=doc.getTextWidth(token.s+' ');if(w>width-10)throw Error(`A word in this bullet is too long: ${b.lead}`);if(used+w>width-10){rows.push([]);used=0;}rows[rows.length-1].push({...token,w});used+=w;}if(rows.length>2)throw Error(`Shorten this bullet to two lines: ${b.lead}`);doc.setFont('times','normal');doc.text('•',left,y);for(const row of rows){let x=left+10;for(const t of row){doc.setFont('times',t.bold?'bold':'normal');doc.text(t.s,x,y);x+=t.w;}y+=line;}y+=2;}};
 text(cv.name,20,true,'center');y+=3;text(cv.contact,10,false,'center');heading('PROFILE');text(cv.profile);text('Skills: '+cv.skills);text('Languages: '+cv.languages);
 heading('EDUCATION');for(const e of cv.education){row(e.institution,e.location,true);row(e.qualification,e.dates,false,true);if(e.details)text(e.details);}
 if(cv.experience.length){heading('PROFESSIONAL EXPERIENCE');cv.experience.forEach(role);}if(cv.leadership.length){heading('EXTRACURRICULAR ACTIVITIES');cv.leadership.forEach(role);}
 if(y>812)throw Error('This draft exceeds one page. Shorten bullets or remove less relevant content before exporting.');
 return doc;
}
