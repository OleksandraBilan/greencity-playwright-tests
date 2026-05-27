import { expect, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class NewsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async openMainPage(): Promise<void> {
    await this.open('/#/greenCity');

    await expect(
      this.page.locator('app-root')
    ).toBeVisible({ timeout: 30000 });
  }

  async openNewsPage(): Promise<void> {
    await this.open('/#/greenCity/news');

    await expect(
      this.page
    ).toHaveURL(/greenCity\/news/);
  }

  async openCreateNewsPage(): Promise<void> {
    await this.open('/#/greenCity/news/create-news');

    await expect(
      this.page
    ).toHaveURL(/greenCity\/news\/create-news/);

    await expect(
      this.page.locator("textarea[formcontrolname='title']")
    ).toBeVisible({ timeout: 30000 });
  }
  async expectNewsVisible(title: string): Promise<void> {
  await this.openNewsPage();

  await expect(
    this.page.getByText(title)
  ).toBeVisible({ timeout: 30000 });
}
}