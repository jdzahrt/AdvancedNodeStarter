const Page = require('./helpers/page');

let page;

beforeEach(async () => {
    page = await Page.build();
    await page.goto('localhost:3000');
});

afterEach(async () => {
    await page.close()
})

test('We can launch a browser', async () => {
    const text = await page.getContentsOf('a.brand-logo');

    expect(text).toEqual('Blogster')
})

test('we should go to auth login page', async () => {
    await page.click('.right a');

    const url = await page.url();

    expect(url).toContain('https://accounts.google.com')
})

test('when signed in, the logout button shows', async () => {
    await page.login();

    const text = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);

    expect(text).toEqual('Logout')
})