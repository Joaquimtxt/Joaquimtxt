const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] }); // <-- importante!
  const page = await browser.newPage();
  await page.goto(`file://${process.cwd()}/docs/languagetable.html`);
  await page.screenshot({ path: 'assets/languagetable.png', fullPage: true });
  await browser.close();
})();
