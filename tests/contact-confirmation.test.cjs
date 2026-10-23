const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function loadContactWorker() {
  const source = fs.readFileSync('worker/index.ts','utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS },
  }).outputText;
  const exports = {};
  vm.runInNewContext(compiled, { exports, Request, Response, URL, TextEncoder, console });
  return exports.default;
}

test('contact form mails an inquiry and BCCs only the visitor confirmation', async () => {
  const contact = loadContactWorker();
  const deliveries = [];
  const env = {
    CONTACT_TO: 'hello@work.jelvan.pro',
    MAILER: { fetch: async request => {
      deliveries.push(JSON.parse(await request.text()));
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }},
  };
  const response = await contact.fetch(new Request('https://portfolio.jelvan.pro/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'https://portfolio.jelvan.pro' },
    body: JSON.stringify({ name: 'Demo Visitor', email: 'visitor@example.com', message: 'I would like to connect.', company: '' }),
  }), env);
  assert.equal(response.status, 200);
  assert.equal(deliveries.length, 1);
  const { messages } = deliveries[0];
  assert.equal(messages.length, 2);
  assert.equal(messages[0].to, 'hello@work.jelvan.pro');
  assert.equal(messages[0].replyTo, 'visitor@example.com');
  assert.equal(messages[0].bcc, undefined, 'BCC belongs only to the visitor confirmation');
  assert.equal(messages[1].to, 'visitor@example.com');
  assert.equal(messages[1].bcc, 'rjelvan@operavaglobal.com');
  assert.equal(messages[1].replyTo, 'hello@work.jelvan.pro');
  assert.match(messages[1].subject, /Thanks for reaching out/);
});

test('invalid form and honeypot do not trigger confirmation or BCC', async () => {
  const worker = loadContactWorker();
  let calls = 0;
  const env = { CONTACT_TO: 'hello@work.jelvan.pro',
    MAILER: {fetch: async () => { calls++; return new Response('{}'); }} };
  const send = async body => worker.fetch(new Request('https://portfolio.jelvan.pro/api/contact', {
    method: 'POST', body: JSON.stringify(body),
    headers: {origin:'https://portfolio.jelvan.pro', 'content-type':'application/json'},
  }), env);
  const bad = await send({name:'Test',email:'not-an-email',message:'Hello'});
  assert.equal(bad.status,422);
  const bot = await send({name:'Test',email:'test@example.com',message:'Hello',company:'spam'});
  assert.equal(bot.status,200);
  assert.equal(calls,0);
});
