import { Locator, Page, expect } from "@playwright/test";
import "dotenv/config";
import { generateRandomEmail } from "../utils/emailGenerator";

export class UserCreationPage {
  private readonly signupLoginLink: Locator;
  private readonly nameInput: Locator
  private readonly emailInput: Locator;
  private readonly signupButton: Locator;
  private readonly infoMessage: Locator;

  private readonly passwordInput: Locator;
  private readonly titleInput: Locator;
  private readonly daysOfBirth: Locator;
  private readonly monthsOfBirth: Locator;
  private readonly yearsOfBirth: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly companyInput: Locator;
  private readonly addressInput: Locator
  private readonly countrySelect: Locator;
  private readonly stateInput: Locator
  private readonly cityInput: Locator;
  private readonly zipcodeInput: Locator
  private readonly mobileNumberInput: Locator;
  private readonly createAccountButton: Locator;
  private readonly accountCreatedMessage: Locator;

  constructor(private readonly page: Page) {
    this.signupLoginLink = page.getByRole('link', { name: ' Signup / Login' });
    this.nameInput = page.getByRole('textbox', { name: 'Name' });
    this.emailInput = page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
    this.signupButton = page.getByRole('button', { name: 'Signup' });
    this.infoMessage = page.getByText('Enter Account Information');

    this.passwordInput = page.getByRole('textbox', { name: 'Password *' });
    this.titleInput = page.getByRole('radio', { name: 'Mr.' });
    this.daysOfBirth = page.locator('#days');
    this.monthsOfBirth = page.locator('#months');
    this.yearsOfBirth = page.locator('#years');
    this.firstNameInput = page.getByRole('textbox', { name: 'First name *' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last name *' });
    this.companyInput = page.getByRole('textbox', { name: 'Company', exact: true });
    this.addressInput = page.getByRole('textbox', { name: 'Address * (Street address, P.' });
    this.countrySelect = page.getByLabel('Country *');
    this.stateInput = page.getByRole('textbox', { name: 'State *' });
    this.cityInput = page.getByRole('textbox', { name: 'City * Zipcode *' });
    this.zipcodeInput = page.locator('#zipcode');
    this.mobileNumberInput = page.getByRole('textbox', { name: 'Mobile Number *' });
    this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
    this.accountCreatedMessage = page.getByText('Account Created!');
  }

  async createAccount(): Promise<void> {
    await this.signupLoginLink.click();
    await this.nameInput.fill('Name Test');
    await this.emailInput.fill(generateRandomEmail());
    await this.signupButton.click();
    await expect(this.infoMessage).toBeVisible();
  }

  async fillRegistrationForm(): Promise<void> {
    await this.passwordInput.fill('Password123!');
    await this.titleInput.click();
    await this.daysOfBirth.selectOption('1');
    await this.monthsOfBirth.selectOption('1');
    await this.yearsOfBirth.selectOption('2000');
    await this.firstNameInput.fill('Name Test');
    await this.lastNameInput.fill('Last Name Test');
    await this.companyInput.fill('Company test');
    await this.addressInput.fill('Street 12');
    await this.countrySelect.selectOption('United States');
    await this.stateInput.fill('NY');
    await this.cityInput.fill('NY');
    await this.zipcodeInput.fill('111206');
    await this.mobileNumberInput.fill('3205698741');
    await this.createAccountButton.click();
}

  async verifyAccountCreation(): Promise<void> {
    await expect(this.accountCreatedMessage).toBeVisible();
  }
 
}
 