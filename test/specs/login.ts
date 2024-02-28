import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/login.page.js";

describe("Login Tests", () => {
  beforeEach("Open app", () => {
    // Initialize the browser or any other setup code
    LoginPage.openURL("customer/account/login/");
    // browser.maximizeWindow();  // run browser maximized
  });

  /* Feature: Login into the webpage using an e-mail address and password.
  
  Scenario: Users logs in.
    Given the login webpage
    When user inputs a valid e-mail address and password 
    Then by clicking on the button "Sign In", it should log in.
  */
  it("Should login with valid credentials and assert result", async () => {
    await LoginPage.login("layola4512@elixirsd.com", "Magento1986");

    // Perform assertions
    const expectedMyAccount = "My Account";
    const expectedAccountInformation = "Account Information";
    const expectedcontactInformation = "Contact Information";

    await expect(browser).toHaveTitle(expectedMyAccount);
    await expect(LoginPage.myAccount).toHaveText(expectedMyAccount);
    await expect(LoginPage.accountInformations).toHaveText(expectedAccountInformation);
    await expect(LoginPage.contactInformation).toHaveText(expectedcontactInformation);
  });
});
