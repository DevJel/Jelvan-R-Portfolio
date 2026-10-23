const assert = require('node:assert/strict');
const test = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const filename = path.join(__dirname, '../utils/dev-tools.ts');
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS } });
const helpers = new Module(filename, module);
helpers._compile(compiled.outputText, filename);
const { randomString, generatePassword, encodeBase32, decodeBase32, convertEncoding, generateTotp } = helpers.exports;

test('generated keys and codes obey requested lengths and alphabets', () => {
  for (const length of [4, 6, 8, 16, 32, 64, 128]) {
    for (const alphabet of ['0123456789', '0123456789abcdef', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567']) {
      const result = randomString(length, alphabet);
      assert.equal(result.length, length);
      assert.ok([...result].every(char => alphabet.includes(char)));
    }
  }
  assert.throws(() => randomString(-1, 'abc'));
  assert.throws(() => randomString(8, ''));
});

test('passwords include every selected group and reject empty selection', () => {
  const groups = ['ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz', '0123456789', '!@#$%'];
  for (const length of [8, 20, 64, 128]) {
    for (let i = 0; i < 20; i++) {
      const password = generatePassword(length, groups);
      assert.equal(password.length, length);
      assert.ok(groups.every(group => [...password].some(char => group.includes(char))));
    }
  }
  assert.throws(() => generatePassword(20, []));
});

test('Base32 matches RFC 4648 known vectors', () => {
  const vectors = [['', ''], ['f', 'MY======'], ['fo', 'MZXQ===='], ['foo', 'MZXW6==='], ['foob', 'MZXW6YQ='], ['fooba', 'MZXW6YTB'], ['foobar', 'MZXW6YTBOI======']];
  for (const [plain, encoded] of vectors) {
    assert.equal(encodeBase32(new TextEncoder().encode(plain)), encoded);
    assert.equal(new TextDecoder().decode(decodeBase32(encoded)), plain);
    assert.equal(new TextDecoder().decode(decodeBase32(encoded.replace(/=+$/, '').toLowerCase())), plain);
  }
  for (const bad of ['M', 'M!', 'MZ======', 'MY=']) assert.throws(() => decodeBase32(bad));
});

test('encoding round-trips Unicode and validates input', () => {
  const text = 'Hello, developer. Kumusta! Español 日本語';
  for (const base of ['32', '64']) assert.equal(convertEncoding(convertEncoding(text, base, false), base, true), text);
  assert.equal(convertEncoding('hello', '64', false), 'aGVsbG8=');
  assert.throws(() => convertEncoding('not@@base64', '64', true));
  assert.throws(() => convertEncoding('/w==', '64', true));
});

test('TOTP matches all RFC 6238 SHA-1 test vectors', async () => {
  const secret = 'GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ';
  for (const [seconds, code] of [[59, '94287082'], [1111111109, '07081804'], [1111111111, '14050471'], [1234567890, '89005924'], [2000000000, '69279037'], [20000000000, '65353130']]) {
    assert.equal(await generateTotp(secret, 8, seconds * 1000), code);
    assert.equal(await generateTotp(secret, 6, seconds * 1000), code.slice(-6));
  }
  await assert.rejects(() => generateTotp('INVALID!'));
  await assert.rejects(() => generateTotp(secret, 4));
});
