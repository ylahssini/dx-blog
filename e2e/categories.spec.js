import { test, expect } from '@playwright/test';
import { host, connectedUser, headers } from './mocks/constants.mock';
import { columns, category_listing, empty_category_listing, category_fields, category_listing_filtered } from './mocks/category.mock';

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

    test('if the title is correct in the category page', async ({ page }) => {
        await expect(page).toHaveTitle(/Categories | Mini-CRM/);
    });

    test.describe('Category listing', () => {
        test('if the loading is showing', async ({ page }) => {
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

        test('if the category list is showing', async ({ page }) => {
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

        test('the filters of categories', async ({ page }) => {
            await page.route('**/api/category/list?limit=3&skip=0', (route) => {
                route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify(category_listing),
                });
            });

            await page.route(`**/api/category/list?limit=3&skip=0&filters=${encodeURIComponent('{"name":"Car"}')}`, (route) => {
                route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    headers,
                    body: JSON.stringify(category_listing_filtered),
                });
            });

            await page.setExtraHTTPHeaders(headers);
            await page.goto(url);

            await expect(page.locator('#filters')).toBeVisible();
            await expect(page.locator('.filter_item')).toHaveCount(3);

            const firstFilterItem = page.locator('.filter_item:first-of-type input');
            await firstFilterItem.fill('Car');

            const resetFilters = page.locator('#reset_filters');
            await expect(resetFilters).toBeVisible();

            await resetFilters.click();
            await page.waitForTimeout(500);

            const inputValue = await firstFilterItem.inputValue();
            await expect(inputValue).toBe('');
        });

        test('if the category list is empty', async ({ page }) => {
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

        test('if the category list is has error from server', async ({ page }) => {
            await page.route('**/api/category/list?limit=3&skip=0', (route) => {
                route.fulfill({
                    status: 500,
                    contentType: 'application/json',
                    body: JSON.stringify({ success: false, message: 'Error is occured' }),
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

            await page.locator('#add_category_button').click();
            await page.waitForTimeout(500);
        });

        async function testCategoryFormStates({ page, key }) {
            for (const [field, value] of Object.entries(category_fields)) {
                if (typeof value === 'boolean') {
                    await page.locator(`#category_${field}`).check();
                } else {
                    await page.locator(`#category_${field}`).fill(value);
                }
            }

            const saveButton = page.locator('#save_button');
            await saveButton.click();

            const tests = {
                loading: async () => await expect(saveButton).toContainText('Sending data'),
                success: async () => {
                    const toast = page.locator('#toast-success');
                    await expect(toast).toBeVisible();
                    await expect(toast.locator('.chakra-alert__title')).toHaveText('Success');
                    await expect(toast.locator('.chakra-alert__desc')).toHaveText('The category \'Home accessories\' is created');
                },
                error: async () => {
                    const toast = page.locator('#toast-error');
                    await expect(toast).toBeVisible();
                    await expect(toast.locator('.chakra-alert__title')).toHaveText('Error');
                    await expect(toast.locator('.chakra-alert__desc')).toHaveText('Internal server error');
                },
            };

            await tests[key]();
        }

        test('if the category form is visible', async ({ page }) => {
            await expect(page.locator('#category_form')).toBeVisible();
        });

        test('the validation of category form is working', async ({ page }) => {
            await page.locator('#save_button').click();
            await expect(page.locator('#category_name + .chakra-form__error-message')).toBeVisible();
            await expect(page.locator('#category_name + .chakra-form__error-message')).toHaveText('Please provide the name of category');
        });

        test('if the save button has the loading state', async ({ page }) => {
            await page.route('**/api/category/create', (route) => {
                if (route.request().method() === 'POST') {
                    route.fallback();
                    return;
                }
            });

            await testCategoryFormStates({ page, key: 'loading' });
        });

        test('if it shows a success toast after creating a category', async ({ page }) => {
            await page.route('**/api/category/create', (route) => {
                route.fulfill({
                    status: 202,
                    contentType: 'application/json',
                    body: JSON.stringify({ success: true }),
                });
            });

            await testCategoryFormStates({ page, key: 'success' });
        });

        test('if it shows an error toast in case that server return an error', async ({ page }) => {
            await page.route('**/api/category/create', (route) => {
                route.fulfill({
                    status: 500,
                    contentType: 'application/json',
                    body: JSON.stringify({ success: false, message: 'Internal server error' }),
                });
            });

            await testCategoryFormStates({ page, key: 'error' });
        });

        test('if the fields are filled with the category data in edit category form', async ({ page }) => {
            await page.locator('#cancel_button').click();
            await expect(page.locator('#category_form')).not.toBeVisible();

            await page.locator('#category_list > tr:first-of-type > td:nth-of-type(5) button').click();
            await page.waitForTimeout(500);

            await expect(page.locator('#category_form')).toBeVisible();

            const { name, description, status } = category_listing.list.items[0];

            for (const [field, value] of Object.entries({ name, description, status })) {
                if (typeof value === 'boolean') {
                    const check = await page.locator(`#category_${field}`).isChecked();
                    await expect(check).toBe(value);
                } else {
                    const inputValue = await page.locator(`#category_${field}`).inputValue();
                    await expect(inputValue).toBe(value);
                }
            }
        });
    });
});
