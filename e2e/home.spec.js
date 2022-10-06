import { test, expect } from '@playwright/test';

const port = process.env.PORT || 9000;
const url = `http://localhost:${port}/`;

test.describe('Home page', () => {
    test('Test if the title is correct in the home page', async ({ page }) => {
        await page.goto(url);
        await expect(page).toHaveTitle(/Welcome to Mini-CRM/);
    });
    
    test('Test if the instalation form is displayed', async ({ page }) => {
        await page.route('**/is-first-install-time', (route) => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ exist: false }),
            });
        });
        await page.goto(url);
        await expect(page.locator('#instalation_form')).toBeVisible();
    });
    
    test('Test if the loading is displayed', async ({ page}) => {
        await page.route('**/is-first-install-time', (route) => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ exist: true }),
            });
        });
        await page.goto(url);
        await expect(page.locator('#login_form')).toBeVisible();
    });
});
