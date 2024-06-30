const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect (page).toHaveText('form > input[name="username"]');
    await expect (page).toHaveText('form > input[name="password"]');
    await expect (page).toHaveText('form > button');
  })
})