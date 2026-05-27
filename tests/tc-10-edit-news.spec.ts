import { allure } from 'allure-playwright';
import { test } from '../fixtures/test.fixture';
import { env } from '../utils/env';

test('TC-10: Author can edit own news and changes are saved', async ({
  loginPage,
  page,
  createNewsPage,
}) => {
  const newsUrl = 'https://www.greencity.cx.ua/#/greenCity/news/11817';
  const updatedTitle = `Edited news ${Date.now()}`;
  const updatedContent = 'Updated content with more than 20 chars';

  let originalDate: string;

  await allure.step('Open GreenCity main page', async () => {
    await page.goto('https://www.greencity.cx.ua/#/greenCity');
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
    await createNewsPage.changeTagFromNewsToEducation();
  });

  await allure.step('Submit edited news', async () => {
    await createNewsPage.clickEditSubmitButton();
  });

  await allure.step('Reload edited news post', async () => {
    await page.goto(newsUrl);
  });

  await allure.step('Verify updated values and unchanged creation date', async () => {
    await createNewsPage.expectNewsTitle(updatedTitle);
    await createNewsPage.expectNewsContent(updatedContent);
    await createNewsPage.expectNewsTag('Education');
    await createNewsPage.expectNewsDate(originalDate);
  });
});