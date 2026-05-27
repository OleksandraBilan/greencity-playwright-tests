import { expect, Page } from '@playwright/test';
import { HeaderComponent } from '../components/header.component';

export class LoginPage {
  private readonly header: HeaderComponent;

  constructor(private readonly page: Page) {
    this.header = new HeaderComponent(page);
  }

  async login(email: string, password: string): Promise<void> {
    await this.header.clickSignIn();

    await this.page.getByRole('textbox', { name: /email/i }).fill(email);
    await this.page.getByRole('textbox', { name: /password/i }).fill(password);

    await this.page.getByRole('button', { name: /^Sign in$/ }).click();

    await expect(
      this.page.locator('.user-name:visible').filter({ hasText: /sasha/i })
    ).toBeVisible({ timeout: 30000 });
  }
}