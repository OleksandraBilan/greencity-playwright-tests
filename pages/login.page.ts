import { expect, Page } from '@playwright/test';
import { HeaderComponent } from '../components/header.component';

export class LoginPage {
  private readonly header: HeaderComponent;

  constructor(private readonly page: Page) {
    this.header = new HeaderComponent(page);
  }

  async login(email: string, password: string): Promise<void> {
    await this.header.clickSignIn();

    const emailInput = this.page.getByRole('textbox', { name: /email/i });
    const passwordInput = this.page.getByRole('textbox', { name: /password/i });

    await emailInput.fill(email);
    await passwordInput.fill(password);

    await this.page
      .getByRole('button', { name: /^Sign in$/i })
      .click();

    await expect(emailInput).toBeHidden({ timeout: 30000 });
  }
}