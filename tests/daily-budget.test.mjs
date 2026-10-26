import test from 'node:test';import assert from 'node:assert/strict';
import {nextUsage} from '../lib/daily-budget.ts';
test('25 requests allowed and further requests blocked until the UTC day changes',()=>{
 let state;for(let i=1;i<=25;i++){state=nextUsage(state,'2026-10-26');assert.equal(state.count,i)}
 assert.equal(nextUsage(state,'2026-10-26'),null);
 assert.deepEqual(nextUsage(state,'2026-10-27'),{day:'2026-10-27',count:1});
});
