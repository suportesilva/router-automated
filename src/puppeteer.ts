import puppeteer from 'puppeteer';
import path from 'path';
console.log("Running Puppeteer");

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  await page.goto('http://192.168.18.1/');

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  // Type into search box
  await page.type('#txt_Username', 'Epadmin');
  await page.type('#txt_Password', 'adminEp');

   // Wait and click on first result
  const loginButton = await page.waitForSelector('#loginbutton');
  await loginButton?.evaluate((e: any) => e.click());

  const configMenu = await page.waitForSelector('#addconfig');
  await configMenu?.evaluate((e: any) => e.click());

  const maintainInfo = await page.waitForSelector('#maintaininfo');
  await maintainInfo?.evaluate((e: any) => e.click());

  const cfgConfig = await page.waitForSelector('#cfgconfig');
  await cfgConfig?.evaluate((e: any) => e.click());

  const filePath = path.join(__dirname, '../backup/backup.xml');
  console.log(filePath);

  const fileInput = await page.$('input[type=file]');
  await fileInput?.uploadFile('./file.pdf');

})();