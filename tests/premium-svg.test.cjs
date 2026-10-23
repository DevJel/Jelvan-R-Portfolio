const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { defs, renderIcon } = require('../scripts/generate-premium-svg.cjs');

const root = path.join(__dirname, '../public/assets/svg-library/premium');
const source = asset => path.join(root, asset.category.toLowerCase(), asset.slug + '.svg');
const still = asset => path.join(root, asset.category.toLowerCase(), asset.slug + '-still.svg');

test('premium icon studio contains 48 unique premium designs across eight collections', () => {
  assert.equal(defs.length, 48);
  assert.equal(new Set(defs.map(item => item.slug)).size, 48);
  assert.equal(new Set(defs.map(item => item.svg)).size, 48, 'Each icon needs a distinct original vector motif');
  const categories = new Set(defs.map(item => item.category));
  assert.equal(categories.size, 8);
  for (const category of categories) {
    assert.equal(defs.filter(item => item.category === category).length, 6);
  }
  assert.equal(defs.filter(item => item.animated).length, 24);
});

test('generated SVG assets are reproducible, self-contained and accessible', () => {
  for (const asset of defs) {
    const filename = source(asset);
    assert.ok(fs.existsSync(filename), filename);
    const svg = fs.readFileSync(filename, 'utf8');
    assert.equal(svg, renderIcon(asset));
    assert.match(svg, /^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"/);
    assert.match(svg, /viewBox="0 0 120 120"/);
    assert.match(svg, /<title>.+<\/title>/);
    assert.match(svg, /data-creator="Jelvan Elements"/);
    assert.match(svg, /<\/svg>$/);
    assert.ok(svg.length > 800, filename + ' should contain vector geometry');
    assert.ok(!/<script\b|<foreignObject\b|\bon\w+\s*=|<(?:image|iframe)\b|\b(?:href|src)=["'](?:https?:|javascript:)/i.test(svg),
      filename + ' must not reference executable or external content');
    if (asset.animated) {
      assert.match(svg, /@keyframes/);
      assert.match(svg, /prefers-reduced-motion:reduce/);
      assert.match(svg, /class="motion"/);
      assert.ok(fs.existsSync(still(asset)));
      const staticSvg = fs.readFileSync(still(asset), 'utf8');
      assert.equal(staticSvg, renderIcon(asset, false));
      assert.doesNotMatch(staticSvg, /@keyframes|class="motion"/);
    } else {
      assert.ok(!fs.existsSync(still(asset)));
      assert.doesNotMatch(svg, /@keyframes/);
    }
  }
});
