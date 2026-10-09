import { chromium } from 'playwright';
import fs from 'node:fs';
fs.mkdirSync('mobile-check', { recursive: true });
const browser = await chromium.launch();
const report = {};
for (const [name, vp, mobile] of [['phone390', { width: 390, height: 844 }, true], ['w320', { width: 320, height: 640 }, true], ['desk1440', { width: 1440, height: 900 }, false]]) {
  const ctx = await browser.newContext({ viewport: vp, isMobile: mobile, hasTouch: mobile });
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:8080/index.html', { waitUntil: 'networkidle' });
  // scroll down gradually so each slide mounts, until the email branding slide exists
  for (let y = 0; y < 60000; y += vp.height) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(250);
    if (await page.$('#email-branding-slide figure.cover')) break;
  }
  await page.evaluate(() => { document.querySelector('#email-branding-slide figure.cover').scrollIntoView({ block: 'start' }); window.scrollBy(0, -90); });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `mobile-check/cover-${name}-a.png` });
  await page.evaluate((h) => window.scrollBy(0, h), vp.height);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `mobile-check/cover-${name}-b.png` });
  report[name] = await page.evaluate(() => {
    const img = document.querySelector('#email-branding-slide figure.cover img');
    return { loaded: img.complete && img.naturalWidth > 0, anim: getComputedStyle(img.parentElement).animationName, sw: document.documentElement.scrollWidth, vw: document.documentElement.clientWidth };
  });
  await ctx.close();
}
await browser.close();
fs.writeFileSync('mobile-check/report.json', JSON.stringify(report, null, 2));
console.log(report);
