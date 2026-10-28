import { Locator, Page, expect } from "@playwright/test";
import type { ContactUsData } from "../testdata/contact-us.data";

export class ContactUsPage {
  private readonly contactUsButton: Locator;
  private readonly nameInput: Locator;
  private readonly emailInput: Locator;
  private readonly subjectInput: Locator;
  private readonly messageInput: Locator;
  private readonly submitButton: Locator;
  private readonly successMessage: Locator;

  constructor(private readonly page: Page) {
    this.contactUsButton = page.getByRole('link', { name: ' Contact us' });
    this.nameInput = page.getByRole('textbox', { name: 'Name' });
    this.emailInput = page.getByRole('textbox', { name: 'Email', exact: true });
    this.subjectInput = page.getByRole('textbox', { name: 'Subject' });
    this.messageInput = page.getByRole('textbox', { name: 'Your Message Here' });
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.successMessage = page.locator('#contact-page .status.alert-success');
  }

  async contactUs(): Promise<void> {
    await Promise.all([
      this.page.waitForURL(url => url.pathname === '/contact_us'),
      this.contactUsButton.click(),
    ]);
    await this.page.waitForLoadState('load');
  }

  async fillContactForm(data: ContactUsData): Promise<void> {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.subjectInput.fill(data.subject);
    await this.messageInput.fill(data.message);
  }

  async submitForm(): Promise<void> {
    const dialogPromise = this.page.waitForEvent('dialog', { timeout: 5000 })
      .then(dialog => dialog.accept());
    await this.submitButton.click();
    await dialogPromise;
    await expect(this.successMessage).toBeVisible();
  }
}
