import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ProductCartPage } from '../pages/ProductCartPage';
import { ContactUsPage } from '../pages/ContactUsPage';
import { UserCreationPage } from '../pages/UserCreationPage';

type Fixtures = {
    loginPage: LoginPage;
    homePage: HomePage;
    productCartPage: ProductCartPage;
    contactUsPage: ContactUsPage;
    userCreationPage: UserCreationPage;
};

export const test = base.extend<Fixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    productCartPage: async ({ page }, use) => {
        await use(new ProductCartPage(page));
    },
    contactUsPage: async ({ page }, use) => {
        await use(new ContactUsPage(page));
    },
    userCreationPage: async ({ page }, use) => {
        await use(new UserCreationPage(page));
    }
});

export { expect } from '@playwright/test';