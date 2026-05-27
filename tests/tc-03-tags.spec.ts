import { allure } from 'allure-playwright';
import { test } from '../fixtures/test.fixture';
import { env } from '../utils/env';

test('TC-03: User can select from 1 to 3 tags only', async ({
  loginPage,
  newsPage,
  createNewsPage,
}) => {
  const firstNewsTitle = `TC-03 One Tag ${Date.now()}`;
  const secondNewsTitle = `TC-03 Three Tags ${Date.now()}`;
  const validContent = 'Test content with 20 chars';

  await allure.step('Open main GreenCity page', async () => {
    await newsPage.openMainPage();
  });

  await allure.step('Log in as registered user', async () => {
    await loginPage.login(env.userEmail, env.userPassword);
  });

  await allure.step('Open Create News page', async () => {
    await newsPage.openCreateNewsPage();
  });

  await allure.step('Select one tag News', async () => {
    await createNewsPage.selectTag('Новини');

    await createNewsPage.expectSelectedTagsCount(1);
    await createNewsPage.expectTagIsSelected('Новини');
  });

  await allure.step('Fill required fields for news with one tag', async () => {
    await createNewsPage.fillTitle(firstNewsTitle);
    await createNewsPage.fillMainText(validContent);
    await createNewsPage.expectPublishButtonEnabled();
  });

  await allure.step('Publish news with one tag', async () => {
    await createNewsPage.clickPublish();
  });

  await allure.step('Verify published news contains News tag', async () => {
    await createNewsPage.expectPublishedNewsContainsTitle(firstNewsTitle);
    await createNewsPage.expectPublishedNewsContainsTag('Новини');
  });

  await allure.step('Open Create News page again', async () => {
    await newsPage.openCreateNewsPage();
  });

  await allure.step('Select three tags News, Events, Education', async () => {
    await createNewsPage.selectTag('Новини');
    await createNewsPage.selectTag('Події');
    await createNewsPage.selectTag('Освіта');

    await createNewsPage.expectSelectedTagsCount(3);
    await createNewsPage.expectTagIsSelected('Новини');
    await createNewsPage.expectTagIsSelected('Події');
    await createNewsPage.expectTagIsSelected('Освіта');
  });

  await allure.step('Try to select fourth tag Initiatives', async () => {
    await createNewsPage.selectTag('Ініціативи');

    await createNewsPage.expectSelectedTagsCount(3);
    await createNewsPage.expectTagIsNotSelected('Ініціативи');
  });

  await allure.step('Fill required fields for news with three tags', async () => {
    await createNewsPage.fillTitle(secondNewsTitle);
    await createNewsPage.fillMainText(validContent);
    await createNewsPage.expectPublishButtonEnabled();
  });

  await allure.step('Publish news with three tags', async () => {
    await createNewsPage.clickPublish();
  });

  await allure.step('Verify published news contains all selected tags', async () => {
    await createNewsPage.expectPublishedNewsContainsTitle(secondNewsTitle);
    await createNewsPage.expectPublishedNewsContainsTag('Новини');
    await createNewsPage.expectPublishedNewsContainsTag('Події');
    await createNewsPage.expectPublishedNewsContainsTag('Освіта');
  });
});