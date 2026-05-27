import { allure } from 'allure-playwright';
import { test } from '../fixtures/test.fixture';
import { env } from '../utils/env';

test('TC-05: Main Text field validates min and max length', async ({
  loginPage,
  newsPage,
  createNewsPage,
}) => {
  const title = `TC-05 Test ${Date.now()}`;
  const shortText = 'Short text';
  const tooLongText = 'a'.repeat(63207);
  const validText = 'This is a valid test content';

  await allure.step('Open main GreenCity page', async () => {
    await newsPage.openMainPage();
  });

  await allure.step('Log in as registered user', async () => {
    await loginPage.login(env.userEmail, env.userPassword);
  });

  await allure.step('Open Create News form', async () => {
    await newsPage.openCreateNewsPage();
  });

  await allure.step('Enter 10 characters in Main Text field', async () => {
    await createNewsPage.fillMainText(shortText);
  });

  await allure.step('Fill Title field with Test', async () => {
    await createNewsPage.fillTitle(title);
  });

  await allure.step('Verify error message appears and Publish remains disabled', async () => {
    await createNewsPage.expectMainTextErrorVisible(/Not enough characters\. Left: 10|Must be minimum 20/i);
    await createNewsPage.expectPublishButtonDisabled();
  });

  await allure.step('Enter 63,207 characters in Main Text field', async () => {
    await createNewsPage.clearMainText();
    await createNewsPage.fillMainText(tooLongText);
  });

  await allure.step('Verify text is truncated to 63,206 characters', async () => {
    await createNewsPage.expectMainTextLength(63206);
    await createNewsPage.expectMainTextCounter('Number of characters: 63206');
  });

  await allure.step('Enter valid 25-character Main Text', async () => {
    await createNewsPage.clearMainText();
    await createNewsPage.fillMainText(validText);
  });

  await allure.step('Verify error disappears and Publish button becomes enabled', async () => {
    await createNewsPage.expectMainTextErrorNotVisible();
    await createNewsPage.selectTag('Новини');
    await createNewsPage.expectPublishButtonEnabled();
  });

  await allure.step('Click Publish', async () => {
    await createNewsPage.clickPublish();
  });

  await allure.step('Verify news is published successfully', async () => {
    await createNewsPage.expectPublishedNewsContainsTitle(title);
  });
});