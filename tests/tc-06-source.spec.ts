import { allure } from 'allure-playwright';
import { test } from '../fixtures/test.fixture';
import { env } from '../utils/env';

test('TC-06: Source field validates URL format', async ({
  loginPage,
  newsPage,
  createNewsPage,
}) => {
  const newsTitle = `TC-06 Source ${Date.now()}`;
  const validContent = 'This is a valid test content';
  const invalidSource = 'www.example.com';
  const validSource = 'https://example.com';

  await allure.step('Open main GreenCity page', async () => {
    await newsPage.openMainPage();
  });

  await allure.step('Log in as registered user', async () => {
    await loginPage.login(env.userEmail, env.userPassword);
  });

  await allure.step('Open Create News form after login', async () => {
    await newsPage.openCreateNewsPage();
  });

  await allure.step('Leave Source empty and fill mandatory fields', async () => {
    await createNewsPage.clearSource();
    await createNewsPage.fillTitle(newsTitle);
    await createNewsPage.selectTag('Новини');
    await createNewsPage.fillMainText(validContent);
  });

  await allure.step('Verify empty Source is allowed', async () => {
    await createNewsPage.expectPublishButtonEnabled();
  });

  await allure.step('Enter invalid Source URL', async () => {
    await createNewsPage.fillSource(invalidSource);
  });

  await allure.step('Verify Source helper text is visible and Publish is disabled for invalid URL', async () => {
    await createNewsPage.expectSourceErrorVisible();
    await createNewsPage.expectPublishButtonDisabled();
  });

  await allure.step('Enter valid Source URL', async () => {
    await createNewsPage.fillSource(validSource);
  });

  await allure.step('Verify valid Source is accepted and Publish is enabled', async () => {
    await createNewsPage.expectPublishButtonEnabled();
  });

  await allure.step('Publish news with valid Source', async () => {
    await createNewsPage.clickPublish();
  });

  await allure.step('Open Eco News page after publishing', async () => {
    await newsPage.openNewsPage();
  });

  await allure.step('Verify news with valid Source is published successfully', async () => {
    await createNewsPage.expectPublishedNewsCardContainsTitle(newsTitle);
  });
});