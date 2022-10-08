import { test, expect } from '@playwright/test';
import { installationFields } from './mocks/home.mock';

const port = process.env.PORT || 9000;
const url = `http://localhost:${port}/`;

test.describe('Home page', () => {
    async function testInstallationField({ page, field, errorKey }) {
        const fieldElement = page.locator(`#installation_${field.key}`);
        const isInvalid = await fieldElement.getAttribute('aria-invalid');
        await expect(isInvalid).toBe('true');

        const parentField = fieldElement.locator('..').locator('..');
        const errorMessage = parentField.locator('.chakra-form__error-message');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage, `#installation_${field.key}`).toHaveText(field.validation[errorKey]);
    }

    test('Test if the title is correct in the home page', async ({ page }) => {
        await page.goto(url);
        await expect(page).toHaveTitle(/Welcome to Mini-CRM/);
    });
    
    test.describe('Installation form', () => {
        test.beforeEach(async ({ page }) => {
            await page.route('**/is-first-install-time', (route) => {
                route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({ exist: false }),
                });
            });
            await page.goto(url);
        });

        test('If the installation form is displayed', async ({ page }) => {
            await expect(page.locator('#installation_form')).toBeVisible();
        });

        test('If it shows the input errors after clicking the signup button without fill any input', async ({ page }) => {
            const signup = page.locator('#signup');
            await expect(signup).toBeVisible();
            await signup.click();

            const installationFieldTests = [];
            for (const field of installationFields) {
                installationFieldTests.push(testInstallationField({ page, field, errorKey: 'required' }));
            }

            await Promise.all(installationFieldTests);
        });

        test('If it shows email and passwors validation error', async ({ page }) => {
            const signup = page.locator('#signup');

            const fieldValues = {
                first_name: 'Joe',
                last_name: 'Doe',
                email: 'joedoe',
                password: 'password',
                confirm_password: 'password',
            };

            for (const field of installationFields) {
                const fieldElement = page.locator(`#installation_${field.key}`);
                await fieldElement.fill(fieldValues[field.key]);
            }

            await signup.click();
            await testInstallationField({ page, field: installationFields.find((field) => field.key === 'email'), errorKey: 'pattern' });
            await testInstallationField({ page, field: installationFields.find((field) => field.key === 'password'), errorKey: 'pattern' });
        });

        test('If it shows password validation error', async ({ page }) => {
            const signup = page.locator('#signup');

            const fieldValues = {
                first_name: 'Joe',
                last_name: 'Doe',
                email: 'joedoe',
                password: 'password0',
                confirm_password: 'password2',
            };

            for (const field of installationFields) {
                const fieldElement = page.locator(`#installation_${field.key}`);
                await fieldElement.fill(fieldValues[field.key]);
            }

            await signup.click();
            await testInstallationField({ page, field: installationFields.find((field) => field.key === 'confirm_password'), errorKey: 'confirm' });
        });
    });

    test.describe('Login form', () => {
        test.beforeEach(async ({ page }) => {
            await page.route('**/is-first-install-time', (route) => {
                route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({ exist: true }),
                });
            });
            await page.goto(url);
        });

        test('If the login form is displayed', async ({ page}) => {
            await expect(page.locator('#login_form')).toBeVisible();
        });
    });
});
