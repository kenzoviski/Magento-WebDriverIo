import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/login.page.js";

describe("Login Tests", () => {
  beforeEach(() => {
    // Initialize the browser or any other setup code
    LoginPage.openURL("customer/account/login/");
    // browser.maximizeWindow();  // run browser maximized
  });

  it("Should login with valid credentials and assert result", async () => {
    // Your test logic here
    await LoginPage.login("layola4512@elixirsd.com", "Magento1986");

    // Perform assertions
    const expectedMyAccount = "My Account";
    const expectedAccountInformation = "Account Information";
    const expectedcontactInformation = "Contact Information";

    await expect(browser).toHaveTitle(expectedMyAccount);
    await expect(LoginPage.myAccount).toHaveText(expectedMyAccount);
    await expect(LoginPage.accountInformations).toHaveText(
      expectedAccountInformation
    );
    await expect(LoginPage.contactInformation).toHaveText(
      expectedcontactInformation
    );
  });
});
