import { allure } from 'allure-playwright';
import { test } from '../fixtures/test.fixture';
import { env } from '../utils/env';

test('TC-01: Create News form displays all required fields', async ({
  loginPage,
  newsPage,
  createNewsPage,
}) => {
  await allure.step('Open main GreenCity page', async () => {
    await newsPage.openMainPage();
  });

  await allure.step('Log in as registered user', async () => {
    await loginPage.login(env.userEmail, env.userPassword);
  });

  await allure.step('Open Create News page', async () => {
    await newsPage.openCreateNewsPage();
  });

  await allure.step('Verify that all required form fields are visible', async () => {
    await createNewsPage.expectFormFieldsVisible();
  });
  
  await allure.step('Verify that form fields are displayed in the correct order', async () => {
  await createNewsPage.expectFormFieldsOrder();
});

  await allure.step('Verify that action buttons are visible', async () => {
    await createNewsPage.expectActionButtonsVisible();
  });
});