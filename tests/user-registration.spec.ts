import { test, expect } from "../fixtures/FixtureBase";

test.beforeEach(async ({ homePage}) => {

  await homePage.navigate();

});

test("user registration", async ({ userCreationPage }) => {
  await userCreationPage.createAccount();
  await userCreationPage.fillRegistrationForm();
  await userCreationPage.verifyAccountCreation();
});
