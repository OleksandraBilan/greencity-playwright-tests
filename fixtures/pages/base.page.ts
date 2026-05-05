import { Page, Locator } from "@playwright/test";

export class BasePage {
  readonly page: Page;
private readonly header: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('header');
  }

    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async getTitle(): Promise<string> {
        return this.page.title();
    }

    async isHeaderVisible(): Promise<boolean> {
        return this.header.isVisible();
    }
}