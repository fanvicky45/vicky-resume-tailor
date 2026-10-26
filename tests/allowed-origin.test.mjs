import test from 'node:test';
import assert from 'node:assert/strict';
import {allowedOrigin} from '../lib/allowed-origin.ts';
test('only same origin or exact configured Pages origin can submit',()=>{
 const req=origin=>new Request('https://api.example/api/tailor',{headers:origin?{origin}: {}});
 assert.equal(allowedOrigin(req('https://fanvicky45.github.io'),'https://fanvicky45.github.io'),true);
 assert.equal(allowedOrigin(req('https://api.example')),true);
 for(const bad of [null,'null','https://evil.example','https://fanvicky45.github.io.evil.example'])assert.equal(allowedOrigin(req(bad),'https://fanvicky45.github.io'),false);
});
