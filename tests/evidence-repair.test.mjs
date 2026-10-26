import test from 'node:test';
import assert from 'node:assert/strict';
import {generateWithEvidenceRepair} from '../lib/evidence-repair.ts';
import {example,sampleResume} from '../lib/example.ts';
function invalid(){const cv=structuredClone(example);cv.experience[0].bullets[0].source='Invented quote that is absent from the resume';return cv;}
test('a grounded draft returns without retry',async()=>{let n=0;const result=await generateWithEvidenceRepair(sampleResume,async()=>{n++;return example});assert.equal(n,1);assert.equal(result,example)});
test('failed quote triggers exactly one repair and revalidation',async()=>{const calls=[];const result=await generateWithEvidenceRepair(sampleResume,async repair=>{calls.push(repair);return repair?example:invalid()});assert.deepEqual(calls,[false,true]);assert.equal(result,example)});
test('two failed drafts never return unverified content',async()=>{let n=0;assert.equal(await generateWithEvidenceRepair(sampleResume,async()=>{n++;return invalid()}),null);assert.equal(n,2)});
test('provider failures are not retried as evidence failures',async()=>{let n=0;await assert.rejects(generateWithEvidenceRepair(sampleResume,async()=>{n++;throw Error('provider failed')}),/provider failed/);assert.equal(n,1)});
