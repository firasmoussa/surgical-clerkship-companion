import { test } from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
import fs from 'node:fs';
import vm from 'node:vm';
import { createRequire } from 'node:module';
const loadModule = createRequire(import.meta.url);
const output = ts.transpileModule(fs.readFileSync('src/app/lib/submissions.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const context = { exports: {} };
vm.runInNewContext(output, context);
const { validateSubmission, LIMITS } = context.exports;
const valid = { procedure: 'Laparoscopic Appendectomy', question: ' Example question ', honeypot: '', startedAt: 1000 };
const check = (body) => validateSubmission(body, 5000);
test('accepts and trims a valid question', () => assert.equal(check(valid).question, 'Example question'));
test('rejects malformed and missing fields', () => {
 for (const body of [null, [], {}, {...valid, question:4}, {...valid, procedure:'other'}, {...valid, question:'  '}, {...valid, startedAt:6000}, {...valid, startedAt:NaN}, {...valid, honeypot:4}]) assert.throws(() => check(body));
});
test('enforces content limits at boundaries', () => {
 for (const [field, limit] of Object.entries(LIMITS)) {
  assert.doesNotThrow(() => check({...valid, [field]:'a'.repeat(limit)}));
  assert.throws(() => check({...valid, [field]:'a'.repeat(limit+1)}));
 }
});
test('rejects links and identifies honeypots', () => {
 assert.throws(() => check({...valid, answer:'HTTPS://example.com'}));
 assert.equal(check({...valid, honeypot:'bot'}).spam, true);
});

const routeCode = ts.transpileModule(fs.readFileSync('src/app/api/pimp/submit/route.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
function harness(options = {}) {
 const rows = [];
 const logs = [];
 const env = { SUBMISSIONS_ENABLED:'true', SUPABASE_URL:'https://example.invalid', SUPABASE_SERVICE_ROLE_KEY:'test-only', UPSTASH_REDIS_REST_URL:'https://example.invalid', UPSTASH_REDIS_REST_TOKEN:'test-only', SUBMISSION_RATE_LIMIT_SECRET:'test-only', VERCEL:'1', ...options.env };
 const sandbox = { console: {error:(...args) => logs.push(args)}, exports: {}, Buffer, Uint8Array, process:{env}, require:(id) => {
  if (id === 'next/server') return { NextResponse: { json:(body,init={}) => ({body,status:init.status||200,headers:init.headers}) } };
  if (id === '@supabase/supabase-js') return { createClient:() => ({from:() => ({insert:async row => { rows.push(row); return {error: options.databaseError}; }})}) };
  if (id === '@upstash/redis') return { Redis:class {} };
  if (id === '@upstash/ratelimit') return { Ratelimit:class { static slidingWindow(){} async limit(){if(options.limiterError) throw new Error(); return options.limit || {success:true};} } };
  if (id === '@/app/lib/submissions') return context.exports;
  return loadModule(id);
 }};
 vm.runInNewContext(routeCode,sandbox);
 return { rows, logs, send:async (body,headers={}) => {
  const request = new Request('https://scrubready.net/api/pimp/submit', {method:'POST',headers:{origin:'https://scrubready.net','content-type':'application/json','x-forwarded-for':'192.0.2.1',...headers},body:typeof body === 'string' ? body : JSON.stringify(body)});
  request.nextUrl = new URL(request.url);
  return sandbox.exports.POST(request);
 }};
}
const liveBody = () => ({...valid, startedAt:Date.now()-5000, status:'approved', ip:'attacker-controlled'});
test('inserts only validated fields as pending without IP or user agent', async()=>{
 const h=harness(); assert.equal((await h.send(liveBody())).status,201);
 assert.equal(h.rows[0].status,'pending'); assert.equal(h.rows[0].anonymous,true);
 assert.equal('ip' in h.rows[0],false); assert.equal('user_agent' in h.rows[0],false);
});
test('fails closed for disabled, missing configuration, limiter failures, and DB errors',async()=>{
 for(const options of [{env:{SUBMISSIONS_ENABLED:'false'}},{env:{SUPABASE_SERVICE_ROLE_KEY:''}},{limiterError:true},{limit:{success:true,reason:'timeout'}},{databaseError:{message:'private internal error'}}]) {
  const h=harness(options); const result=await h.send(liveBody()); assert.equal(result.status,503); assert.equal(JSON.stringify(result).includes('private internal error'),false);
 }
});
test('blocks cross-origin, non-JSON, invalid IP, rate-limit and oversized requests before insert',async()=>{
 for(const [options,body,headers,status] of [
  [{},liveBody(),{origin:'https://other.example'},403],
  [{},liveBody(),{'content-type':'text/plain'},415],
  [{},liveBody(),{'x-forwarded-for':'not-an-ip'},503],
  [{limit:{success:false,reset:Date.now()+10000}},liveBody(),{},429],
  [{},'a'.repeat(17000),{},413], [{},'{bad',{},400], [{},{...liveBody(),question:[]},{},400],
 ]) { const h=harness(options); assert.equal((await h.send(body,headers)).status,status); assert.equal(h.rows.length,0); }
});
test('honeypot returns success without storing a row',async()=>{
 const h=harness(); assert.equal((await h.send({...liveBody(),honeypot:'bot'})).status,200); assert.equal(h.rows.length,0);
});

test('diagnostics contain fixed stage codes only, never error details or form content', async () => {
 const cases = [
  [{env:{SUPABASE_SERVICE_ROLE_KEY:''}}, {}, 'configuration'],
  [{}, {'x-forwarded-for':'invalid'}, 'client_address'],
  [{limiterError:true}, {}, 'rate_limit_service'],
  [{limit:{success:true,reason:'timeout'}}, {}, 'rate_limit_timeout'],
  [{databaseError:{message:'sensitive database detail'}}, {}, 'database_insert'],
 ];
 for (const [options, headers, stage] of cases) {
  const h = harness(options);
  const result = await h.send({...liveBody(),question:'private submission text'}, headers);
  assert.equal(result.status,503);
  assert.deepEqual(h.logs, [['[submissions] unavailable', stage]]);
  assert.equal(JSON.stringify(result).includes(stage),false);
 }
});
