import { Locator, Page, expect } from "@playwright/test";
import "dotenv/config";

export class LoginPage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly signupLoginLink: Locator;

  constructor(private readonly page: Page) {
    this.emailInput = page.locator('[data-qa="login-email"]');
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.signupLoginLink = page.getByRole("link", { name: " Signup / Login" });
  }

  async login(email: string, password: string) {
    await this.signupLoginLink.click();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

