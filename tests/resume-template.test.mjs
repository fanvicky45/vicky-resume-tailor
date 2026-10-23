import test from 'node:test';
import assert from 'node:assert/strict';
import { createPDF } from '../lib/pdf.ts';
import { example, sampleResume } from '../lib/example.ts';
import { evidenceErrors } from '../lib/tailor.ts';

test('fictional example fills the approved template and has source evidence',()=>{
 assert.equal(example.education.length,2);
 assert.equal(example.experience.length,3);
 assert.ok(example.experience.every(r=>r.bullets.length===3));
 assert.equal(example.leadership.length,2);
 assert.ok(example.leadership.every(r=>r.bullets.length===2));
 assert.deepEqual(evidenceErrors(example,sampleResume),[]);
 assert.equal(createPDF(example).getNumberOfPages(),1);
});
test('truthful shorter records export without padding',()=>{
 const cv=structuredClone(example);
 cv.education=cv.education.slice(0,1);
 cv.experience=cv.experience.slice(0,1);
 cv.experience[0].bullets=cv.experience[0].bullets.slice(0,1);
 cv.leadership=cv.leadership.slice(0,1);
 cv.leadership[0].bullets=cv.leadership[0].bullets.slice(0,1);
 assert.equal(createPDF(cv).getNumberOfPages(),1);
});
test('exports reject more entries or bullets than the template',()=>{
 for(const field of ['education','experience','leadership']){
  const cv=structuredClone(example);
  const max={education:2,experience:3,leadership:2}[field];
  cv[field]=Array.from({length:max+1},()=>structuredClone(cv[field][0]));
  assert.throws(()=>createPDF(cv),/template|count|at most/i);
 }
 for(const field of ['experience','leadership']){
  const cv=structuredClone(example);
  const max=field==='experience'?3:2;
  cv[field][0].bullets=Array.from({length:max+1},()=>structuredClone(cv[field][0].bullets[0]));
  assert.throws(()=>createPDF(cv),/template|count|at most/i);
 }
});
test('overlong bullets cannot be exported',()=>{
 const cv=structuredClone(example);
 cv.experience[0].bullets[0].text='Documented work and measured outcomes. '.repeat(25);
 assert.throws(()=>createPDF(cv),/two lines/);
});
