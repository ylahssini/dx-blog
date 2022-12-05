import { test, expect } from '@playwright/test';
import { host, connectedUser, headers } from './mocks/constants.mock';

const url = host + '_/dashboard';

test.describe('Dashboard page', () => {
    test.beforeEach(async ({ page }) => {
        await page.route('**/is-connected', (route) => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(connectedUser),
            });
        });
        await page.setExtraHTTPHeaders(headers);
        await page.goto(url);
    });

    test('if the page is working', async ({ page }) => {
        await expect(page).not.toHaveTitle(/^Error/);
    });

    test('if the title is correct in the dashboard page', async ({ page }) => {
        await expect(page).toHaveTitle('Dashboard | DX-Blog');
    });
});
