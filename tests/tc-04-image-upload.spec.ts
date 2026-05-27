import path from 'path';
import { allure } from 'allure-playwright';
import { test } from '../fixtures/test.fixture';
import { env } from '../utils/env';

test('TC-04: Upload Image field validates file format and size', async ({
  loginPage,
  newsPage,
  createNewsPage,
}) => {
  const validPngPath = path.resolve('test-data/valid-image.png');
  const invalidGifPath = path.resolve('test-data/invalid-image.gif');
  const largeJpgPath = path.resolve('test-data/large-image.jpg');

  await allure.step('Open main GreenCity page', async () => {
    await newsPage.openMainPage();
  });

  await allure.step('Log in as registered user', async () => {
    await loginPage.login(env.userEmail, env.userPassword);
  });

  await allure.step('Open Create News form', async () => {
    await newsPage.openCreateNewsPage();
  });

  await allure.step('Upload PNG file with size 5MB', async () => {
    await createNewsPage.uploadImage(validPngPath);
  });

  await allure.step('Verify PNG image uploads successfully', async () => {
    await createNewsPage.expectValidImageUploaded();
  });

  await allure.step('Apply uploaded PNG image', async () => {
    await createNewsPage.clickApplyImageButton();
  });

  await allure.step('Cancel image editing mode', async () => {
    await createNewsPage.clickCancelImageButton();
  });

  await allure.step('Upload GIF file with size 1MB', async () => {
    await createNewsPage.uploadImage(invalidGifPath);
  });

  await allure.step('Verify validation error is shown for GIF image', async () => {
    await createNewsPage.expectImageUploadError();
  });

  await allure.step('Upload JPEG file with size 15MB', async () => {
    await createNewsPage.uploadImage(largeJpgPath);
  });

  await allure.step('Verify validation error is shown for large JPEG image', async () => {
    await createNewsPage.expectImageUploadError();
  });
});