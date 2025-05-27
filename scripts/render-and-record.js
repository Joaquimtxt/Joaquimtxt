const puppeteer = require('puppeteer');
const { execSync } = require('child_process');
const fs = require('fs');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.setViewport({ width: 500, height: 300 });

  await page.goto(`file://${process.cwd()}/Docs/index.html`);
  await sleep(2000); // espera a animação iniciar

  const framesDir = './frames';
  fs.mkdirSync(framesDir, { recursive: true });

  for (let i = 0; i < 30; i++) {
    await page.screenshot({ path: `${framesDir}/frame_${i.toString().padStart(3, '0')}.png` });
    await sleep(100); // captura a cada 100ms
  }

  await browser.close();

  execSync(`ffmpeg -y -framerate 10 -i ${framesDir}/frame_%03d.png -vf "scale=500:-1" assets/nave.gif`);
})();
