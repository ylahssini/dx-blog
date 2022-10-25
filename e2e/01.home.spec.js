import { test, expect } from '@playwright/test';
import { installationFields, loginFields } from './mocks/home.mock';
import { host } from './mocks/constants.mock';

test.describe('Home page', () => {
    async function testInstallationField({ section, page, field, errorKey }) {
        const fieldElement = page.locator(`#${section}_${field.key}`);
        const isInvalid = await fieldElement.getAttribute('aria-invalid');
        await expect(isInvalid).toBe('true');

        const parentField = fieldElement.locator('..').locator('..');
        const errorMessage = parentField.locator('.chakra-form__error-message');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage, `#${section }_${field.key}`).toHaveText(field.validation[errorKey]);
    }

    test('Test if the title is correct in the home page', async ({ page }) => {
        await page.goto(host);
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
            await page.goto(host);
        });

        test('if the loading is showing', async ({ page }) => {
            await page.route('**/is-first-install-time', (route) => {
                if (route.request().method === 'GET') {
                    route.fallback();
                    return;
                }
            });
            await page.goto(host);
            await expect(page.locator('#installation_form')).not.toBeVisible();
            await expect(page.locator('#loading')).toBeVisible();
        });

        test('if the installation form is displayed', async ({ page }) => {
            await expect(page.locator('#installation_form')).toBeVisible();
        });

        test('if it shows the input errors after clicking the signup button without fill any input', async ({ page }) => {
            const signup = page.locator('#signup');
            await expect(signup).toBeVisible();
            await signup.click();

            const installationFieldTests = [];
            for (const field of installationFields) {
                installationFieldTests.push(testInstallationField({ section: 'installation', page, field, errorKey: 'required' }));
            }

            await Promise.all(installationFieldTests);
        });

        test('if it shows email and password validation error', async ({ page }) => {
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
            await testInstallationField({ section: 'installation', page, field: installationFields.find((field) => field.key === 'email'), errorKey: 'pattern' });
            await testInstallationField({ section: 'installation', page, field: installationFields.find((field) => field.key === 'password'), errorKey: 'pattern' });
        });

        test('if it shows password validation error', async ({ page }) => {
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
            await testInstallationField({ section: 'installation', page, field: installationFields.find((field) => field.key === 'confirm_password'), errorKey: 'confirm' });
        });

        test('if it shows a success toast after fill all inputs', async ({ page }) => {
            await page.route('**/installation', (route) => {
                route.fulfill({
                    status: 202,
                    contentType: 'application/json',
                    body: JSON.stringify({ success: true }),
                });
            });
            await page.goto(host);

            const signup = page.locator('#signup');

            const fieldValues = {
                first_name: 'Joe',
                last_name: 'Doe',
                email: 'joedoe@test.com',
                password: 'password0',
                confirm_password: 'password0',
            };

            for (const field of installationFields) {
                const fieldElement = page.locator(`#installation_${field.key}`);
                await fieldElement.fill(fieldValues[field.key]);
            }

            await signup.click();
            const toast = page.locator('#toast-success');
            await expect(toast).toBeVisible();
            await expect(toast.locator('.chakra-alert__title')).toHaveText('Success');
            await expect(toast.locator('.chakra-alert__desc')).toHaveText('Your account is created');

            for (const field of installationFields) {
                const fieldElement = page.locator(`#installation_${field.key}`);
                await expect(fieldElement).toHaveValue('');
            }
        });

        test('if it shows an error toast after fill all inputs', async ({ page }) => {
            const response = { success: false, message: 'We fail to register the user' };
            await page.route('**/installation', (route) => {
                route.fulfill({
                    status: 500,
                    contentType: 'application/json',
                    body: JSON.stringify(response),
                });
            });
            await page.goto(host);

            const signup = page.locator('#signup');

            const fieldValues = {
                first_name: 'Joe',
                last_name: 'Doe',
                email: 'joedoe@test.com',
                password: 'password0',
                confirm_password: 'password0',
            };

            for (const field of installationFields) {
                const fieldElement = page.locator(`#installation_${field.key}`);
                await fieldElement.fill(fieldValues[field.key]);
            }

            await signup.click();
            const toast = page.locator('#toast-error');
            await expect(toast).toBeVisible();
            await expect(toast.locator('.chakra-alert__title')).toHaveText('Error');
            await expect(toast.locator('.chakra-alert__desc')).toHaveText(response.message);

            for (const field of installationFields) {
                const fieldElement = page.locator(`#installation_${field.key}`);
                await expect(fieldElement).not.toHaveValue('');
            }
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
            await page.goto(host);
        });

        test('if the loading is showing', async ({ page }) => {
            await page.route('**/is-first-install-time', (route) => {
                if (route.request().method === 'GET') {
                    route.fallback();
                    return;
                }
            });
            await page.goto(host);
            await expect(page.locator('#login_form')).not.toBeVisible();
            await expect(page.locator('#loading')).toBeVisible();
        });

        test('if the login form is displayed', async ({ page}) => {
            await expect(page.locator('#login_form')).toBeVisible();
        });

        test('if it shows errors of not filling the inputs of login form', async ({ page }) => {
            const login = page.locator('#login');
            await expect(login).toBeVisible();
            await login.click();

            const loginFieldTests = [];
            for (const field of loginFields) {
                loginFieldTests.push(testInstallationField({ section: 'login', page, field, errorKey: 'required' }));
            }

            await Promise.all(loginFieldTests);
        });

        test('if it show a email validation error', async ({ page }) => {
            const fieldValues = {
                email: 'joedoe',
                password: 'password0',
            };

            for (const field of loginFields) {
                const fieldElement = page.locator(`#login_${field.key}`);
                await fieldElement.fill(fieldValues[field.key]);
            }

            await page.locator('#login').click();
            await testInstallationField({ section: 'login', page, field: loginFields.find((field) => field.key === 'email'), errorKey: 'pattern' });
        });

        test('if the login form go to the admin section', async ({ page }) => {
            await page.route('**/login', (route) => {
                route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({ success: true }),
                });
            });
            await page.goto(host);

            const fieldValues = {
                email: 'joedoe@test.com',
                password: 'password0',
            };

            for (const field of loginFields) {
                const fieldElement = page.locator(`#login_${field.key}`);
                await fieldElement.fill(fieldValues[field.key]);
            }

            await page.locator('#login').click();
            await page.goto(host + 'dashboard');
            await expect(page).toHaveURL(host + 'dashboard');
        });

        test('if it shows an error toast in case that server return an error', async ({ page }) => {
            const response = { success: false, message: 'The email or password are not correct' };
            await page.route('**/login', (route) => {
                route.fulfill({
                    status: 500,
                    contentType: 'application/json',
                    body: JSON.stringify(response),
                });
            });
            await page.goto(host);

            const fieldValues = {
                email: 'joedoe@test.com',
                password: '2135123',
            };

            for (const field of loginFields) {
                const fieldElement = page.locator(`#login_${field.key}`);
                await fieldElement.fill(fieldValues[field.key]);
            }

            await page.locator('#login').click();

            const toast = page.locator('#toast-error');
            await expect(toast).toBeVisible();
            await expect(toast.locator('.chakra-alert__title')).toHaveText('Error');
            await expect(toast.locator('.chakra-alert__desc')).toHaveText(response.message);
        });
    });
});
