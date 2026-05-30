import { expect, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class NewsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async openMainPage(): Promise<void> {
    await this.openGreenCity();

    await expect(this.page).toHaveURL(/#\/greenCity/);
  }

  async openNewsPage(): Promise<void> {
    await this.openEcoNews();

    await expect(this.page).toHaveURL(/#\/greenCity\/news$/);
  }

  async openCreateNewsPage(): Promise<void> {
    await this.openCreateNews();

    await expect(this.page).toHaveURL(/#\/greenCity\/news\/create-news/);

    await expect(
      this.page.locator("textarea[formcontrolname='title']")
    ).toBeVisible({ timeout: 30000 });
  }

  async openExistingNewsPage(newsId: string): Promise<void> {
    await this.openExistingNews(newsId);

    await expect(this.page).toHaveURL(new RegExp(`#\\/greenCity\\/news\\/${newsId}`));
  }
  
}