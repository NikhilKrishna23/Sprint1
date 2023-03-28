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

  test('should navigate to the correct page when clicking on a link', async () => {
    const homeLink = await page.waitForSelector('a[href="#home"]');
    await homeLink.click();
    expect(await page.url()).toContain('home');

    const coursesLink = await page.waitForSelector('a[href="#courses"]');
    await coursesLink.click();
    expect(await page.url()).toContain('courses');

    const aboutLink = await page.waitForSelector('a[href="#about"]');
    await aboutLink.click();
    expect(await page.url()).toContain('about');

    const contactLink = await page.waitForSelector('a[href="#contact"]');
    await contactLink.click();
    expect(await page.url()).toContain('contact');
  });
});
