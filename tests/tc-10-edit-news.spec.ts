import { allure } from 'allure-playwright';
import { expect } from '@playwright/test';
import { test } from '../fixtures/test.fixture';
import { env } from '../utils/env';

test('TC-10: Author can edit own news and changes are saved', async ({
  loginPage,
  newsPage,
  page,
  createNewsPage,
}) => {
  const newsId = '11817';
  const newsUrl = `https://www.greencity.cx.ua/#/greenCity/news/${newsId}`;
  const updatedTitle = `Edited news ${Date.now()}`;
  const updatedContent = 'Updated content with more than 20 chars';

  let originalDate: string;

  await allure.step('Open GreenCity main page', async () => {
    await newsPage.openMainPage();
  });

  await allure.step('Log in as author', async () => {
    await loginPage.login(env.userEmail, env.userPassword);
  });

  await allure.step('Open existing news post', async () => {
    await page.goto(newsUrl);
  });

  await allure.step('Save original creation date', async () => {
    originalDate = await createNewsPage.getNewsCreatedDate();
  });

  await allure.step('Click Edit news button', async () => {
    await createNewsPage.clickEditNewsButton();
  });

  await allure.step('Modify title, content and tag', async () => {
    await createNewsPage.fillTitle(updatedTitle);
    await createNewsPage.clearMainText();
    await createNewsPage.fillMainText(updatedContent);
    await createNewsPage.changeTagToEducation();
  });

  await allure.step('Submit edited news', async () => {
    await createNewsPage.clickEditSubmitButton();
  });

  await allure.step('Close unexpected cancel modal if it appears', async () => {
  await createNewsPage.closeUnexpectedCancelModalIfVisible();
});

await allure.step('Open edited news post again', async () => {
  await page.goto(newsUrl, { waitUntil: 'domcontentloaded' });

  await expect(page).toHaveURL(/#\/greenCity\/news\/11817/, {
    timeout: 30000,
  });
});

  await allure.step('Verify updated values and unchanged creation date', async () => {
    await createNewsPage.expectNewsTitle(updatedTitle);
    await createNewsPage.expectNewsContent(updatedContent);
    await createNewsPage.expectNewsTag('Education');
    await createNewsPage.expectNewsDate(originalDate);
  });
});