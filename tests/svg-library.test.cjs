const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { TYPES, makeSVG } = require('../scripts/generate-svg-library.cjs');

const base = path.join(__dirname, '../public/assets/svg-library/pc-components');
const files = Array.from({ length: 100 }, (_, index) => {
  const number = index + 1;
  const kind = TYPES[index % TYPES.length];
  const name = 'pc_component_' + String(number).padStart(3, '0') + '_' + kind + '_premium.svg';
  return { number, kind, variant: Math.floor(index / TYPES.length), file: path.join(base, kind, name) };
});
files.push({
  number: 100, kind: 'cpu', variant: 10, alternate: true,
  file: path.join(base, 'cpu', 'pc_component_100_cpu_premium-variant-2.svg'),
});

test('the gallery contains 101 complete self-hosted hardware SVG designs', () => {
  assert.equal(files.length, 101);
  for (const entry of files) {
    assert.ok(fs.existsSync(entry.file), entry.file + ' should exist');
    const svg = fs.readFileSync(entry.file, 'utf8');
    assert.ok(svg.startsWith('<svg xmlns="http://www.w3.org/2000/svg"'), entry.file);
    assert.match(svg, /viewBox="0 0 400 400"/);
    assert.match(svg, /<\/svg>$/);
    assert.ok(svg.length > 1400, entry.file + ' should contain illustration paths');
    assert.ok(!/<script\b|<foreignObject\b|\bon\w+\s*=|<(?:image|iframe)\b|\b(?:href|src)=["'](?:https?:|javascript:)/i.test(svg),
      entry.file + ' should not contain executable code or external resources');
    assert.match(svg, /data-creator="Jelvan Elements"/);
    assert.equal(svg, makeSVG(entry.kind, entry.variant, entry.number, !!entry.alternate),
      entry.file + ' must match the reproducible source generator');
  }
});

test('each composition is structurally distinct beyond filenames and text labels', () => {
  const geometryOnly = files.map(({file}) => fs.readFileSync(file, 'utf8')
    .replace(/<title>.*?<\/title>/g, '')
    .replace(/<desc>.*?<\/desc>/g, '')
    .replace(/<metadata>.*?<\/metadata>/g, '')
    .replace(/<text\b[^>]*>.*?<\/text>/g, '')
    .replace(/\s+/g, ' '));
  assert.equal(new Set(geometryOnly).size, 101);
  assert.equal(new Set(files.map(({kind}) => kind)).size, 10);
  for (const kind of TYPES) assert.equal(files.filter(x => x.kind === kind).length, kind === 'cpu' ? 11 : 10);
});
