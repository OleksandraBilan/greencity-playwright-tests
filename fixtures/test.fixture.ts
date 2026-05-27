import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { NewsPage } from '../pages/news.page';
import { CreateNewsPage } from '../pages/create-news.page';

type Fixtures = {
  loginPage: LoginPage;
  newsPage: NewsPage;
  createNewsPage: CreateNewsPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  newsPage: async ({ page }, use) => {
    await use(new NewsPage(page));
  },

  createNewsPage: async ({ page }, use) => {
    await use(new CreateNewsPage(page));
  },
});

export { expect } from '@playwright/test';