import { test, expect } from '../fixtures/FixtureBase';
import { blockThirdPartyAds } from "../utils/blockThirdPartyAds";


test("Login functionality", async ({ homePage,loginPage,page }) => {

  const email = process.env.EMAIL!;
  const password = process.env.PASSWORD!;

  await blockThirdPartyAds(page);
  await homePage.navigate();
  await loginPage.login(email, password);
    
  await expect(page.getByText("Logged in as Eduard David")).toBeVisible();
});
