import { test, expect } from "../fixtures/FixtureBase";
import { blockThirdPartyAds } from "../utils/blockThirdPartyAds";


test.beforeEach(async ({ homePage, loginPage, page, productCartPage }) => {
  const email = process.env.EMAIL!;
  const password = process.env.PASSWORD!;

  await blockThirdPartyAds(page);
  await homePage.navigate();
  await loginPage.login(email, password);
  await expect(page.getByText("Logged in as Eduard David")).toBeVisible();
  await productCartPage.clearCart();
});

test("The user completes the purchase of a menTshirt", async ({ productCartPage }) => {  
  await productCartPage.searchProduct();
  await productCartPage.addCart();
  await productCartPage.verifyProductInCart();
  await productCartPage.proceedToCheckout();
  await productCartPage.fillPaymentDetails();
  await productCartPage.verifyOrderConfirmation();
});
