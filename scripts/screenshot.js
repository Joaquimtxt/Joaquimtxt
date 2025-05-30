const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    const filePath = `file://${path.resolve(__dirname, '../docs/languagetable.html')}`;
    await page.goto(filePath, { waitUntil: 'networkidle0' });

    const outputDir = path.resolve(__dirname, '../assets');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const screenshotPath = path.resolve(outputDir, 'languagetable.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });

    await browser.close();
    console.log('Screenshot salva em:', screenshotPath);
  } catch (err) {
    console.error('Erro ao gerar screenshot:', err);
    process.exit(1);
  }
})();
