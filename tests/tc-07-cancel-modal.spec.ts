import { allure } from 'allure-playwright';
import { test } from '../fixtures/test.fixture';
import { env } from '../utils/env';

test('TC-07: Cancel button confirmation modal', async ({
  loginPage,
  newsPage,
  createNewsPage,
}) => {
  const title = 'Test';
  const content = 'Test content with 20 chars';

  await allure.step('Open main GreenCity page', async () => {
    await newsPage.openMainPage();
  });

  await allure.step('Log in as registered user', async () => {
    await loginPage.login(env.userEmail, env.userPassword);
  });

  await allure.step('Open Create News page after login', async () => {
    await newsPage.openCreateNewsPage();
  });

  await allure.step('Fill Create News form', async () => {
    await createNewsPage.fillTitle(title);
    await createNewsPage.fillMainText(content);
  });

  await allure.step('Click Cancel button', async () => {
    await createNewsPage.clickFormCancelButton();
  });

  await allure.step('Verify confirmation modal appears', async () => {
    await createNewsPage.expectCancelModalVisible();
  });

  await allure.step('Click Continue editing', async () => {
    await createNewsPage.clickContinueEditing();
  });

  await allure.step('Verify form remains open with entered data', async () => {
    await createNewsPage.expectStillOnCreateNewsPage();
    await createNewsPage.expectTitleValue(title);
    await createNewsPage.expectMainTextValue(content);
  });

  await allure.step('Click Cancel button again', async () => {
    await createNewsPage.clickFormCancelButton();
  });

  await allure.step('Verify confirmation modal appears again', async () => {
    await createNewsPage.expectCancelModalVisible();
  });

  await allure.step('Click Yes, cancel', async () => {
    await createNewsPage.clickYesCancel();
  });

  await allure.step('Verify user is redirected to UBS page', async () => {
    await createNewsPage.expectRedirectedToUbsPage();
  });
});