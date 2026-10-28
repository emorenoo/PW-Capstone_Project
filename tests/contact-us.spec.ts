import { test } from "../fixtures/FixtureBase";
import { contactUsCases } from "../testdata/contact-us.data";
import { blockThirdPartyAds } from "../utils/blockThirdPartyAds";


test.beforeEach(async ({ homePage, page }) => {
  await blockThirdPartyAds(page);
  await homePage.navigate();
});

for (const contactCase of contactUsCases) {
  test(`Contact Us form submission for ${contactCase.name}`, async ({ contactUsPage }) => {
    await contactUsPage.contactUs();
    await contactUsPage.fillContactForm(contactCase);
    await contactUsPage.submitForm();
  });
}
