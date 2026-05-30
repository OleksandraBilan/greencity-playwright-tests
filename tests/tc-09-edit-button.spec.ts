import { allure } from 'allure-playwright';
import { test } from '../fixtures/test.fixture';
import { env } from '../utils/env';

test('TC-09: Verify Edit news button is visible for author', async ({
  loginPage,
  newsPage,
  createNewsPage,
}) => {
  const newsId = '11817';

  await allure.step('Open GreenCity main page', async () => {
    await newsPage.openMainPage();
  });

  await allure.step('Log in as author of the news', async () => {
    await loginPage.login(env.userEmail, env.userPassword);
  });

  await allure.step('Open created news page after login', async () => {
    await newsPage.openExistingNewsPage(newsId);
  });

  await allure.step('Verify Edit news button is visible', async () => {
    await createNewsPage.expectEditNewsButtonVisible();
  });
});