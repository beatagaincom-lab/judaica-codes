const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const outputDir = path.join('output', 'playwright', 'redesign-v2');
const baseUrl = 'http://127.0.0.1:5173/';

const shots = [
  ['desktop-full', 1440, 1600],
  ['desktop-hero', 1440, 980, '.hero'],
  ['desktop-manifesto', 1440, 980, '.manifesto'],
  ['desktop-signature', 1440, 1000, '.signature'],
  ['desktop-gallery', 1440, 1100, '.work-gallery'],
  ['desktop-process', 1440, 1000, '.process'],
  ['desktop-collection', 1440, 1100, '.collection'],
  ['desktop-services', 1440, 1000, '.services'],
  ['mobile-full', 390, 1200],
  ['mobile-hero', 390, 844, '.hero'],
  ['mobile-gallery', 390, 900, '.work-gallery'],
  ['mobile-collection', 390, 900, '.collection'],
];

async function revealPage(page) {
  const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const viewportHeight = page.viewportSize().height;
  const step = Math.max(360, Math.floor(viewportHeight * 0.72));

  for (let y = 0; y < totalHeight; y += step) {
    await page.evaluate((nextY) => window.scrollTo(0, nextY), y);
    await page.waitForTimeout(160);
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
}

(async () => {
  fs.mkdirSync(outputDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  for (const [name, width, height, selector] of shots) {
    const page = await browser.newPage({
      viewport: { width, height },
      deviceScaleFactor: 1,
    });

    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    await page.waitForTimeout(5600);

    const targetPath = path.join(outputDir, `${name}.png`);

    if (selector) {
      await page.locator(selector).scrollIntoViewIfNeeded();
      await page.waitForTimeout(900);
      await page.locator(selector).screenshot({ path: targetPath });
    } else {
      await revealPage(page);
      await page.screenshot({ path: targetPath, fullPage: true });
    }

    await page.close();
  }

  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
