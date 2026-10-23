import test from 'node:test';
import assert from 'node:assert/strict';
import {withTimeout} from '../lib/with-timeout.ts';
test('stalled file reader rejects so the UI can leave loading state',async()=>{
 await assert.rejects(withTimeout(new Promise(()=>{}),10,'Paste your resume instead'),/Paste your resume instead/);
});
test('successful and failed reads retain their original result',async()=>{
 assert.equal(await withTimeout(Promise.resolve('resume'),100,'timeout'),'resume');
 await assert.rejects(withTimeout(Promise.reject(new Error('invalid file')),100,'timeout'),/invalid file/);
});
