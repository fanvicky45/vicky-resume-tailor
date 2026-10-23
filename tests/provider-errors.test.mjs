import test from 'node:test';
import assert from 'node:assert/strict';
import {providerFailure} from '../lib/provider-errors.ts';
test('billing exhaustion is distinguished from transient throttling',()=>{
 for(const code of ['credit_balance_exhausted','insufficient_quota']){
  const result=providerFailure(429,{error:{code,type:'insufficient_quota'}});
  assert.equal(result.status,503);assert.match(result.error,/credits/);
 }
 assert.equal(providerFailure(429,{error:{code:'rate_limit_exceeded'}}).status,429);
});
test('provider errors never expose raw upstream details',()=>{
 const result=providerFailure(401,{error:{message:'private upstream detail'}});
 assert.equal(result.status,503);assert.doesNotMatch(result.error,/private upstream detail/);
 assert.equal(providerFailure(500,null).status,502);
});
