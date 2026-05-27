import { allure } from 'allure-playwright';
import { test } from '../fixtures/test.fixture';
import { env } from '../utils/env';

test('TC-02: Title field validation works correctly', async ({
  loginPage,
  newsPage,
  createNewsPage,
}) => {
  await allure.step('Open main GreenCity page', async () => {
    await newsPage.openMainPage();
  });

  await allure.step('Log in as registered user', async () => {
    await loginPage.login(env.userEmail, env.userPassword);
  });

  await allure.step('Open Create News page', async () => {
    await newsPage.openCreateNewsPage();
  });

  await allure.step('Verify empty Title field is invalid and Publish is disabled', async () => {
    await createNewsPage.clearTitle();
    await createNewsPage.expectTitleInvalid();
    await createNewsPage.expectTitleCounter('0/170');
    await createNewsPage.expectPublishButtonDisabled();
  });

  await allure.step('Enter 171 characters and verify Title becomes invalid', async () => {
    const longTitle = 'a'.repeat(171);

    await createNewsPage.fillTitle(longTitle);

    await createNewsPage.expectTitleCounter('171/170');
    await createNewsPage.expectTitleInvalid();
    await createNewsPage.expectPublishButtonDisabled();
  });

  await allure.step('Enter valid Title and verify counter and valid state', async () => {
    await createNewsPage.fillTitle('Test News');

    await createNewsPage.expectTitleCounter('9/170');
    await createNewsPage.expectTitleValid();
    await createNewsPage.expectPublishButtonDisabled();
  });

  await allure.step('Select tag and fill valid Content', async () => {
    await createNewsPage.selectNewsTag();
    await createNewsPage.fillMainText('This is a valid test content');
  });

  await allure.step('Verify Publish button becomes enabled', async () => {
    await createNewsPage.expectPublishButtonEnabled();
  });
});