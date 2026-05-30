import { allure } from 'allure-playwright';
import { test } from '../fixtures/test.fixture';
import { env } from '../utils/env';

test('TC-03: User can select from 1 to 3 tags only', async ({
  loginPage,
  newsPage,
  createNewsPage,
}) => {
  const newsTitle = `TC-03 Tags ${Date.now()}`;
  const validContent = 'Test content with 20 chars';

  await allure.step('Open main GreenCity page', async () => {
    await newsPage.openMainPage();
  });

  await allure.step('Log in as registered user', async () => {
    await loginPage.login(env.userEmail, env.userPassword);
  });

  await allure.step('Open Create News page after login', async () => {
    await newsPage.openCreateNewsPage();
  });

  await allure.step('Select one tag News', async () => {
    await createNewsPage.selectTag('Новини');

    await createNewsPage.expectSelectedTagsCount(1);
    await createNewsPage.expectTagIsSelected('Новини');
  });

  await allure.step('Select three tags News, Events, Education', async () => {
    await createNewsPage.selectTag('Події');
    await createNewsPage.expectSelectedTagsCount(2);

    await createNewsPage.selectTag('Освіта');
    await createNewsPage.expectSelectedTagsCount(3);

    await createNewsPage.expectTagIsSelected('Новини');
    await createNewsPage.expectTagIsSelected('Події');
    await createNewsPage.expectTagIsSelected('Освіта');
  });

  await allure.step('Try to select fourth tag Initiatives', async () => {
    await createNewsPage.selectTagWithoutExpect('Ініціативи');

    await createNewsPage.expectSelectedTagsCount(3);
    await createNewsPage.expectTagIsNotSelected('Ініціативи');
  });

  await allure.step('Fill required fields', async () => {
    await createNewsPage.fillTitle(newsTitle);
    await createNewsPage.fillMainText(validContent);
    await createNewsPage.expectPublishButtonEnabled();
  });

  await allure.step('Publish news with selected tags', async () => {
    await createNewsPage.clickPublish();
  });

  await allure.step('Open Eco News page after publishing', async () => {
    await newsPage.openNewsPage();
  });

  await allure.step('Verify published news contains selected tags', async () => {
    await createNewsPage.expectPublishedNewsCardContainsTitle(newsTitle);
    await createNewsPage.expectPublishedNewsCardContainsTag(newsTitle, 'Новини');
    await createNewsPage.expectPublishedNewsCardContainsTag(newsTitle, 'Події');
    await createNewsPage.expectPublishedNewsCardContainsTag(newsTitle, 'Освіта');
  });
});