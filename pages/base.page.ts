import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async open(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async openGreenCity(): Promise<void> {
    await this.page.goto('https://www.greencity.cx.ua/#/greenCity');
  }

  async openEcoNews(): Promise<void> {
    await this.page.goto('https://www.greencity.cx.ua/#/greenCity/news');
  }

  async openCreateNews(): Promise<void> {
    await this.page.goto('https://www.greencity.cx.ua/#/greenCity/news/create-news');
  }

  async openExistingNews(newsId: string): Promise<void> {
    await this.page.goto(`https://www.greencity.cx.ua/#/greenCity/news/${newsId}`);
  }
}