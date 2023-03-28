const { chromium } = require('playwright');

describe('Educational Website', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await chromium.launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('https://www.educationalwebsite.com/');
  });

  afterEach(async () => {
    await page.close();
  });

  test('should display navigation bar', async () => {
    const navbar = await page.$('.navbar');
    expect(navbar).not.toBeNull();
  });

  test('should display jumbotron with title and subtitle', async () => {
    const jumbotron = await page.$('.jumbotron');
    expect(jumbotron).not.toBeNull();
    const title = await jumbotron.$eval('h1', el => el.textContent);
    expect(title).toContain('Welcome to our Educational Website!');
    const subtitle = await jumbotron.$eval('p', el => el.textContent);
    expect(subtitle).toContain('We offer a wide range of courses');
  });

  test('should display About Us section', async () => {
    const aboutUs = await page.$('#about-us');
    expect(aboutUs).not.toBeNull();
    const title = await aboutUs.$eval('h2', el => el.textContent);
    expect(title).toContain('About Us');
    const description = await aboutUs.$eval('p', el => el.textContent);
    expect(description).toContain('We are dedicated to providing high-quality education');
  });

  test('should subscribe to newsletter', async () => {
    const emailInput = await page.$('input[type="email"]');
    expect(emailInput).not.toBeNull();
    await emailInput.type('test@example.com');
    const subscribeBtn = await page.$('button[type="submit"]');
    expect(subscribeBtn).not.toBeNull();
    await subscribeBtn.click();
    await page.waitForSelector('.alert-success');
    const successMessage = await page.$('.alert-success');
    expect(successMessage).not.toBeNull();
    const messageText = await successMessage.$eval('p', el => el.textContent);
    expect(messageText).toContain('Thank you for subscribing!');
  });
});
