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

  /** 5.18: Blog List End To End Testing, step 2 */
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
    
    /** 5.19: Blog List End To End Testing, step 3 */
    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
           await page.goto('http://localhost:5173');
           const blogPosts = [
            { title: 'Blog 1', author: 'Author 1', likes: 5 },
            { title: 'Blog 2', author: 'Author 2', likes: 10 },
            { title: 'Blog 3', author: 'Author 3', likes: 3 },
            ];
            
            for (const blog of blogPosts) {
                await page.click('button:text("new blog")');
                await page.fill('input[name="title"]', blog.title);
                await page.fill('input[name="author"]', blog.author);
                await page.fill('input[name="url"]', 'test url');
                await page.click('button:text("submit")');
            }
            for (let i = 0; i < blogPosts.length; i++) {
                await page.click(`div.blog:has-text("${blog.title}") button:text("like")`);

            } 
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
        /** 5.20: Blog List End To End Testing, step 4 */
        test('a user can like a blog', async ({ page }) => {
            await page.click('button:text("view")');

            await page.click('button:text("like")');
            // adding a like
            await expect(page).toHaveText('1 likes');
        });
        /**5.21: Blog List End To End Testing, step 5 */
        test('a blog can be deleted by the user who added it', async ({ page }) => {
            await page.click(`div.blog:has-text("${createdBlog}") button:text("remove")`);
            
            //window.confirm dialog in the delete operation
            await page.on('dialog', async dialog => {
                await dialog.accept(); 
            });
            await expect(page).not.toHaveText('Test Blog Title');
            await expect(page).not.toHaveText('Test Author');
            await expect(page).not.toHaveText('0 likes'); 
        });
        /** 5.22: Blog List End To End Testing, step 6 */
        test('only the user who added the blog sees the delete button', async ({ page }) => {
            
            // 
            for (let i = 0; i < users.length; i++) {
              const blog = blogs[i];
              const deleteButtonSelector = `div.blog:has-text("${blog.title}") button:text("remove")`;
      
              
              await page.goto('http://localhost:5173'); 
              await page.fill('input[name="username"]', users[i].username);
              await page.fill('input[name="password"]', users[i].password);

              await Promise.all([
                page.waitForNavigation(),
                page.click('form > button[type="submit"]'),
              ]);
      
              if (blog.user.username === users[i].username) {
                await expect(page).toHaveSelector(deleteButtonSelector); 
              } else {
                await expect(page).not.toHaveSelector(deleteButtonSelector); 
              }
            }
        });
        /** 5.23: Blog List End To End Testing, step 7 */
        test('blogs are ordered by likes, most liked first', async ({ page }) => {
            
            const blogPosts = await page.$$eval('div.blog', blogs => blogs.map(blog => ({
              title: blog.querySelector('div > div:first-child').innerText.trim(),
              likes: Number(blog.querySelector('div > div:nth-child(2) p').innerText.split(' ')[0])
            })));
      
            // verify order by likes
            for (let i = 1; i < blogPosts.length; i++) {
              expect(blogPosts[i - 1].likes).toBeGreaterThanOrEqual(blogPosts[i].likes);
            }
          });
    })

    
  });
})