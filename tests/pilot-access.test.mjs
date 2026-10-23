import test from 'node:test';
import assert from 'node:assert/strict';
import {requiresPilotCode} from '../lib/pilot-access.ts';
test('local development can tailor without a code',()=>{
 for(const host of ['localhost','127.0.0.1','[::1]'])assert.equal(requiresPilotCode(`http://${host}:5173/api/tailor`,true),false);
});
test('deployed and non-loopback servers retain the gate',()=>{
 for(const development of [true,false])assert.equal(requiresPilotCode('https://resume.example/api/tailor',development),true);
 assert.equal(requiresPilotCode('http://127.0.0.1:5173/api/tailor',false),true);
});
