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

  test('should allow users to subscribe with a valid email address', async () => {
    const emailInput = await page.waitForSelector('input[type="email"]');
    await emailInput.type('test@example.com');

    const subscribeButton = await page.waitForSelector('button[type="button"]');
    await subscribeButton.click();

    const successMessage = await page.waitForSelector('.alert-success');
    expect(await successMessage.isVisible()).toBe(true);
  });

  test('should show an error message when subscribing with an invalid email address', async () => {
    const emailInput = await page.waitForSelector('input[type="email"]');
    await emailInput.type('invalid-email');

    const subscribeButton = await page.waitForSelector('button[type="button"]');
    await subscribeButton.click();

    const errorMessage = await page.waitForSelector('.alert-danger');
    expect(await errorMessage.isVisible()).toBe(true);
  });
});
