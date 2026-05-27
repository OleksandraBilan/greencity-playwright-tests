import { allure } from 'allure-playwright';
import { test } from '../fixtures/test.fixture';
import { env } from '../utils/env';

test('TC-08: Verify news preview mode', async ({
  loginPage,
  newsPage,
  createNewsPage,
}) => {
  const title = 'Test Preview';
  const content = 'This is a test preview content';

  await allure.step('Open GreenCity main page', async () => {
    await newsPage.openMainPage();
  });

  await allure.step('Login as registered user', async () => {
    await loginPage.login(env.userEmail, env.userPassword);
  });

  await allure.step('Open Create News page', async () => {
    await newsPage.openCreateNewsPage();
  });

  await allure.step('Fill Title field', async () => {
    await createNewsPage.fillTitle(title);
  });

  await allure.step('Fill Main Text field', async () => {
    await createNewsPage.fillMainText(content);
  });

  await allure.step('Select required tag', async () => {
    await createNewsPage.selectTag('Освіта');
  });

  await allure.step('Click Preview button', async () => {
    await createNewsPage.clickPreview();
  });

  await allure.step('Verify preview title', async () => {
    await createNewsPage.expectPreviewTitle(title);
  });

  await allure.step('Verify preview content', async () => {
    await createNewsPage.expectPreviewContent(content);
  });

  await allure.step('Verify preview date', async () => {
    await createNewsPage.expectPreviewDate();
  });

  await allure.step('Verify preview author', async () => {
  await createNewsPage.expectPreviewAuthor('sasha');
});

  await allure.step('Verify Back to editing button is visible', async () => {
    await createNewsPage.expectBackToEditingButton();
  });
});