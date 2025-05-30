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

    // Define o tamanho da viewport
    await page.setViewport({ width: 800, height: 200 });

    // Define fundo transparente
    await page.evaluate(() => {
      document.body.style.background = 'transparent';
    });

    const outputDir = path.resolve(__dirname, '../assets');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Gera screenshot com fundo transparente e sem fullPage
    const screenshotPath = path.resolve(outputDir, 'languagetable.png');
    await page.screenshot({
      path: screenshotPath,
      fullPage: false,
      omitBackground: true
    });

    await browser.close();
    console.log('Screenshot salva em:', screenshotPath);
  } catch (err) {
    console.error('Erro ao gerar screenshot:', err);
    process.exit(1);
  }
})();
