import { Locator, Page } from '@playwright/test';

export class HeaderComponent {
  readonly signInIcon: Locator;

  constructor(private readonly page: Page) {
    this.signInIcon = page.locator("//header//img[contains(@src, 'user.svg')]");
  }

  async clickSignIn(): Promise<void> {
    await this.signInIcon.waitFor({ state: 'visible', timeout: 30000 });
    await this.signInIcon.click();
  }
}