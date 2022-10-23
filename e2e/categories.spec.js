import { test, expect } from '@playwright/test';
import { host, connectedUser, headers } from './mocks/constants.mock';
import { columns, category_listing, empty_category_listing } from './mocks/category.mock';

const url = `${host}_/categories`;

test.describe('Category page', () => {
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

    test('Test if the title is correct in the category page', async ({ page }) => {
        await expect(page).toHaveTitle(/Categories | Mini-CRM/);
    });

    test.describe('Category listing', () => {
        test('Test if the loading is showing', async ({ page }) => {
            await page.route('**/api/category/list?limit=3&skip=0', (route) => {
                if (route.request().method() === 'GET') {
                    route.fallback();
                    return;
                }
            });
            await page.setExtraHTTPHeaders(headers);
            await page.goto(url);

            await expect(page.locator('.loading_table')).toBeVisible();
        });

        test('Test if the category list is showing', async ({ page }) => {
            await page.route('**/api/category/list?limit=3&skip=0', (route) => {
                route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify(category_listing),
                });
            });
            await page.setExtraHTTPHeaders(headers);
            await page.goto(url);

            await expect(page.locator('#category_list')).toBeVisible();
            await expect(page.locator('#results'), 'Incorrect total of results').toHaveText('5 results found');

            await Promise.all(columns.map(async (column, index) => {
                await expect(
                    page.locator(`#category_list_container > table > thead > tr > th:nth-of-type(${index + 1})`),
                    `The column (${column}) is not in this order (${index + 1})`,
                ).toHaveText(column);
            }));

            await expect(page.locator('#category_list > tr:first-of-type > td:nth-of-type(1)')).toHaveText(category_listing.list.items[0].name);
            await expect(page.locator('#category_list > tr:first-of-type > td:nth-of-type(2)')).toHaveText(category_listing.list.items[0].description);
            await expect(page.locator('#category_list > tr:first-of-type > td:nth-of-type(3) > span')).toHaveText(category_listing.list.items[0].status ? 'Enabled' : 'Disabled');
            await expect(page.locator('#category_list > tr:first-of-type > td:nth-of-type(4)')).toHaveText('16/10/2022');
        });

        test('Test if the category list is empty', async ({ page }) => {
            await page.route('**/api/category/list?limit=3&skip=0', (route) => {
                route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify(empty_category_listing),
                });
            });
            await page.setExtraHTTPHeaders(headers);
            await page.goto(url);

            await expect(page.locator('#category_list')).not.toBeVisible();
            await expect(page.locator('#results'), 'Incorrect total of results').toHaveText('0 results found');
            await expect(page.locator('.empty_table')).toBeVisible();
        });

        test('Test if the category list is error', async ({ page }) => {
            await page.route('**/api/category/list?limit=3&skip=0', (route) => {
                route.fulfill({
                    status: 500,
                    contentType: 'application/json',
                    body: JSON.stringify({ success: false, error: 'Error is occured' }),
                });
            });
            await page.setExtraHTTPHeaders(headers);
            await page.goto(url);

            await expect(page.locator('#category_list')).not.toBeVisible();
            await expect(page.locator('#results'), 'Incorrect total of results').toHaveText('0 results found');
            await expect(page.locator('.error_table')).toBeVisible();
        });
    });

    test.describe('Category form', () => {
        test.beforeEach(async ({ page }) => {
            await page.route('**/api/category/list?limit=3&skip=0', (route) => {
                route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify(category_listing),
                });
            });
            await page.setExtraHTTPHeaders(headers);
            await page.goto(url);
        });

        test('Test if the category form is visible', async ({ page }) => {
            await page.locator('#add_category_button').click();
            await page.waitForTimeout(500);
            await expect(page.locator('#category_form')).toBeVisible();
        });

        test('Test the validation of category form is working', async ({ page }) => {
            await page.locator('#add_category_button').click();
            await page.waitForTimeout(500);

            await page.locator('#save_button').click();
            await expect(page.locator('#category_name + .chakra-form__error-message')).toBeVisible();
            await expect(page.locator('#category_name + .chakra-form__error-message')).toHaveText('Please provide the name of category');
        });
    });
});
