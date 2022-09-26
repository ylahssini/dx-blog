import { test, expect } from '@playwright/test';

test('homepage', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Welcome to Mini-CRM/);
});
