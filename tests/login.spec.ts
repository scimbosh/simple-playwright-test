import { test, expect } from '@playwright/test';

test('login test 1', async ({ page }) => {
    await page.goto('http://localhost:4200');
  
    await page.getByPlaceholder('LOGIN').fill('user')
    await page.getByPlaceholder('PASSWORD').fill('password')
    await page.getByText('ENTER').click()

    await expect(page.locator('h1')).toBeVisible();
    
  });
  