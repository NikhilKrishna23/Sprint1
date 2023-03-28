const { chromium } = require('playwright');

describe('Educational Website', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:8000'); // replace with your website URL
  });

  afterAll(async () => {
    await browser.close();
  });

  test('should display the correct title', async () => {
    expect(await page.title()).toBe('Educational Website');
  });

  test('should display the correct header', async () => {
    const header = await page.waitForSelector('h1');
    expect(await header.innerText()).toBe('Welcome to our Educational Website!');
  });

  test('should allow user to subscribe', async () => {
    const emailInput = await page.waitForSelector('input[type="email"]');
    await emailInput.type('test@example.com');
    const subscribeButton = await page.waitForSelector('button[type="button"]');
    await subscribeButton.click();
    const alert = await page.waitForSelector('.alert');
    expect(await alert.innerText()).toBe('Thanks for subscribing!');
  });
});
