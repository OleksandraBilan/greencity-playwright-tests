import { allure } from 'allure-playwright';
import { test } from '../fixtures/test.fixture';
import { env } from '../utils/env';

test('TC-06: Source field validates URL format', async ({
  loginPage,
  newsPage,
  createNewsPage,
}) => {
  const emptySourceTitle = `TC-06 Empty Source ${Date.now()}`;
  const validSourceTitle = `TC-06 Valid Source ${Date.now()}`;
  const validContent = 'This is a valid test content';
  const invalidSource = 'www.example.com';
  const validSource = 'https://example.com';

  await allure.step('Open main GreenCity page', async () => {
    await newsPage.openMainPage();
  });

  await allure.step('Log in as registered user', async () => {
    await loginPage.login(env.userEmail, env.userPassword);
  });

  await allure.step('Open Create News form', async () => {
    await newsPage.openCreateNewsPage();
  });

  await allure.step('Leave Source empty and fill mandatory fields', async () => {
    await createNewsPage.clearSource();
    await createNewsPage.fillTitle(emptySourceTitle);
    await createNewsPage.selectTag('Новини');
    await createNewsPage.fillMainText(validContent);
    await createNewsPage.expectPublishButtonEnabled();
  });

  await allure.step('Publish news without Source', async () => {
    await createNewsPage.clickPublish();
  });

  await allure.step('Verify news without Source is published successfully', async () => {
    await createNewsPage.expectPublishedNewsContainsTitle(emptySourceTitle);
  });

  await allure.step('Open Create News form again', async () => {
    await newsPage.openCreateNewsPage();
  });

  await allure.step('Enter invalid Source URL', async () => {
    await createNewsPage.fillTitle(validSourceTitle);
    await createNewsPage.selectTag('Новини');
    await createNewsPage.fillMainText(validContent);
    await createNewsPage.fillSource(invalidSource);
  });

  await allure.step('Verify Source error appears and Publish is disabled', async () => {
    await createNewsPage.expectSourceErrorVisible();
    await createNewsPage.expectPublishButtonDisabled();
  });

  await allure.step('Enter valid Source URL', async () => {
    await createNewsPage.fillSource(validSource);
  });

  await allure.step('Verify Source error disappears and Publish is enabled', async () => {
    await createNewsPage.expectSourceErrorNotVisible();
    await createNewsPage.expectPublishButtonEnabled();
  });

  await allure.step('Publish news with valid Source', async () => {
    await createNewsPage.clickPublish();
  });

  await allure.step('Verify news with valid Source is published successfully', async () => {
    await createNewsPage.expectPublishedNewsContainsTitle(validSourceTitle);
  });
});