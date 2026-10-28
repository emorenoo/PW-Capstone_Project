import { test, expect } from "../fixtures/FixtureBase";
import { blockThirdPartyAds } from "../utils/blockThirdPartyAds";

test.beforeEach(async ({ homePage, loginPage, page }) => {
  const email = process.env.EMAIL!;
  const password = process.env.PASSWORD!;

  await blockThirdPartyAds(page);
  await homePage.navigate();
  await loginPage.login(email, password);
  await expect(page.getByText("Logged in as Eduard David")).toBeVisible();
});

test("Logout functionality", async ({ page }) => {
  const logoutButton = page.getByRole("link", { name: " Logout" });
  await logoutButton.click();

  await expect(page.getByText("Logged in as Eduard David")).not.toBeVisible();
  await expect(page.getByRole("heading", { name: "Login to your account" }),).toBeVisible();
});
