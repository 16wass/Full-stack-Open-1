const { test, expect, beforeEach, describe } = require('@playwright/test')
const { reset, createUser } = require('./backend-api');

describe('Blog app', () => {
    let user;
  beforeEach(async ({ page }) => {

    await reset(); 
    /** user  */
    user = await createUser();
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect (page).toHaveText('form > input[name="username"]');
    await expect (page).toHaveText('form > input[name="password"]');
    await expect (page).toHaveText('form > button');
  });


  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.fill('input[name="username"]', user.username);
      await page.fill('input[name="password"]', user.password);

      // form submission
      await Promise.all([
        page.waitForNavigation(), 
        page.click('form > button[type="submit"]'),
      ]);

      await expect(page).toHaveText(`Logged in as ${user.name}`);
    });

    test('fails with wrong credentials', async ({ page }) => {
      // a login form with incorrect credentials
      await page.fill('input[name="username"]', 'invalidusername');
      await page.fill('input[name="password"]', 'invalidpassword');

     //form submission
      await page.click('form > button[type="submit"]');
      await expect(page).toHaveText('Wrong username or password. Please try again.');
    });

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
           await page.goto('http://localhost:5173');
        })
      
        test('a new blog can be created', async ({ page }) => {
            await page.click('button:text("new blog")');

            await page.fill('input[name="title"]', 'test title');
            await page.fill('input[name="author"]', 'test author');
            await page.fill('input[name="url"]', 'test url');

            await page.click('button:text("submit")');

            await expect(page).toHaveText('test title ');
            await expect(page).toHaveText('test author');
            await expect(page).toHaveText('test url');
            await expect(page).toHaveText('0 likes');


        })
      })

  });
})