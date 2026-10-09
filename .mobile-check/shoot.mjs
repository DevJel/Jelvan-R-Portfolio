import { chromium } from 'playwright';
import fs from 'node:fs';

const BASE = 'http://127.0.0.1:8080';
const PAGES = [
  ['home', '/index.html'],
  ['resume', '/portfolio/resume.html'],
  ['projects', '/portfolio/projects.html'],
  ['contact', '/portfolio/contact.html'],
];
const VIEWPORTS = [
  ['phone390', { width: 390, height: 844 }],
  ['phone360', { width: 360, height: 740 }],
];
fs.mkdirSync('mobile-check', { recursive: true });
const report = {};
const browser = await chromium.launch();
for (const [vpName, vp] of VIEWPORTS) {
  for (const [name, path] of PAGES) {
    const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
    const page = await ctx.newPage();
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    let y = 0, i = 0;
    const shots = [];
    // scroll step by step so every slide's on-screen animation fires
    while (true) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(1300);
      if (vpName === 'phone390') {
        const f = `mobile-check/${name}-${String(i).padStart(2, '0')}.png`;
        await page.screenshot({ path: f });
        shots.push(f);
      }
      const h = await page.evaluate(() => document.documentElement.scrollHeight);
      if (y + vp.height >= h || i > 60) break;
      y += vp.height; i++;
    }
    const overflow = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const out = [];
      for (const el of document.querySelectorAll('body *')) {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        if (r.width === 0 || cs.visibility === 'hidden' || cs.display === 'none') continue;
        if (r.right > vw + 2 || r.left < -2) {
          let p = el.parentElement, clipped = false;
          while (p) { const o = getComputedStyle(p).overflowX; if (o === 'hidden' || o === 'clip') { clipped = true; break; } p = p.parentElement; }
          if (!clipped) out.push({ tag: el.tagName, cls: String(el.className).slice(0, 80), text: (el.innerText || '').slice(0, 50), left: Math.round(r.left), right: Math.round(r.right) });
        }
      }
      return { vw, scrollWidth: document.documentElement.scrollWidth, offenders: out.slice(0, 25) };
    });
    report[`${vpName}:${name}`] = { ...overflow, shots: shots.length };
    await ctx.close();
  }
}
await browser.close();
fs.writeFileSync('mobile-check/report.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
