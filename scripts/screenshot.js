const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'], 
  });
  const page = await browser.newPage();
  const filePath = `file://${path.resolve(__dirname, '../docs/languagetable.html')}`;
  await page.goto(filePath, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'assets/languagetable.png', fullPage: true });
  await browser.close();
})();
