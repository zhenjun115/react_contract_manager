import puppeteer from 'puppeteer';

const BASE_URL = `http://localhost:${process.env.PORT || 8000}`;

describe('Homepage', () => {
  beforeAll(async () => {
    jest.setTimeout(1000000);
  });
  it('it should have logo text', async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto('http://localhost:8000', { waitUntil: 'networkidle2' });
    await page.waitForSelector('#logo h1');
    const text = await page.evaluate(() => document.body.innerHTML);
    expect(text).toContain('<h1>合同管理系统</h1>');
    await page.close();
    browser.close();
  });
});
