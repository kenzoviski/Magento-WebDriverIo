import { expect } from "@wdio/globals";
import CreateLogin from "../pageobjects/createLogin.page.js";
import createLoginPage from "../pageobjects/createLogin.page.js";

describe("Create new login", () => {
  beforeEach("Open app", () => {
    // Initialize the browser or any other setup code
    CreateLogin.openURL("customer/account/create/");
    // browser.maximizeWindow();  // run browser maximized
  });

  let infoUser = {
    firstName: "Thomas",
    lastName: "Anderson",
    email: "neo@matrix.com",
    password: "//ImTheOne1986\\",
  };

  let confirmPassword = infoUser.password;

  const requiredField = "This is a required field.";

  /* Feature: Create login on the webpage with the accordingly required fields and restrictions.
  
  Scenario 1: Elements are visible on the create new account webpage.
    Given the create new account webpage
    When webpage is loaded 
    Then the following elements should be visible
  */
  it('1. Should have all the elements in the "Create New Customer Account"page', async () => {
    // Assertion - Page title
    await expect(browser).toHaveTitle("Create New Customer Account");

    // Assertions - Page elements
    await expect(CreateLogin.createNewCustomerAccountTitleTextLabel).toHaveText("Create New Customer Account");
    await expect(CreateLogin.personalInformationTextLabel).toHaveText("Personal Information");
    await expect(CreateLogin.firstNameTextLabel).toHaveText("First Name");
    await expect(createLoginPage.firstNameTextBox).toExist();
    await expect(CreateLogin.lastNameTextLabel).toHaveText("Last Name");
    await expect(CreateLogin.lastNameTextBox).toExist();
    await expect(CreateLogin.signInTextLabel).toHaveText("Sign-in Information");
    await expect(CreateLogin.emailTextLabel).toHaveText("Email");
    await expect(CreateLogin.emailTextBox).toExist();
    await expect(CreateLogin.passwordTextLabel).toHaveText("Password");
    await expect(CreateLogin.passwordTextBox).toExist();
    await expect(CreateLogin.passwordAlertStrengthMessage).toHaveText("Password Strength: No Password");
    await expect(CreateLogin.confirmPasswordTextLabel).toHaveText("Confirm Password");
    await expect(createLoginPage.confirmPasswordTextBox).toExist();
    await expect(CreateLogin.btnCreateAnAccount).toExist();
  });

  /*
  Scenario 2: Filling the fields and asserting through regEx (code validations).
    Given the create new account webpage
    When webpage is loaded 
    Then fill the fields and assert values through code (Whitespaces, invalid characters on password, password = confirmationPassword)
  */
  it("2. Should fill form and validate fields through regEx (expectValidations = false)", async () => {
    // Assertion done using code and expectValidations = false
    await createLoginPage.fieldsSetValues(infoUser.firstName, infoUser.lastName, infoUser.email, infoUser.password, confirmPassword, false);
  });

  /*
  Scenario 3: Filling the fields and asserting required fields.
    Given the create new account webpage
    When webpage is loaded 
    Then fill the fields and assert required fields
  */
  it("3. Should fill form incorrectly and assert fields through page notifications", async () => {
    // Set values in fields and validate through code
    infoUser.firstName = "";
    infoUser.lastName = "";
    infoUser.email = "";
    infoUser.password = "";
    confirmPassword = "";
    await createLoginPage.fieldsSetValues(infoUser.firstName, infoUser.lastName, infoUser.email, infoUser.password, confirmPassword);

    // Assertions
    await expect(createLoginPage.firstNameAlert).toHaveText(requiredField);
    await expect(createLoginPage.lastNameAlert).toHaveText(requiredField);
    await expect(createLoginPage.lastNameAlert).toHaveText(requiredField);
    await expect(createLoginPage.emailAlert).toHaveText(requiredField);
    await expect(createLoginPage.passwordsAlert).toHaveText(requiredField);
    await expect(createLoginPage.passwordAlertStrengthMessage).toHaveText("Password Strength: No Password");
    await expect(createLoginPage.lastNameAlert).toHaveText(requiredField);
  });

  /*
  Scenario 4: Fill wrongly the e-mail address.
    Given the create new account webpage
    When webpage is loaded 
    Then fill e-mail address with a wrong value (Success: ex: value@domain.com | Failure: test.com)
  */
  it("4. Should fill with a wrong e-mail and assert with 'emailAlertMessage'", async () => {
    infoUser.email = "test.com";
    const emailAlertMessage = "Please enter a valid email address (Ex: johndoe@domain.com).";

    await createLoginPage.emailTextBox.setValue(infoUser.email);
    await createLoginPage.clickCreateAnAccount();
    await expect(createLoginPage.emailAlert).toHaveText(emailAlertMessage);
  });

  /*
  Scenario 5: Fill the passowrd and assert password strength.
    Given the create new account webpage
    When webpage is loaded 
    Then fill password and evaluate its strength (Weak, Medium, Strong, Very Strong)
  */
  it("5. Should fill password and assert password strength", async () => {
    infoUser.password = "abc"; // Weak
    await createLoginPage.passwordTextBox.setValue(infoUser.password);
    await expect(createLoginPage.passwordAlertStrengthMessage).toHaveText("Password Strength: Weak"); //Se não funcionar, utilizar o selector: #password-strength-meter-label

    infoUser.password += ".1.a"; // Medium
    await createLoginPage.passwordTextBox.setValue(infoUser.password);
    await expect(createLoginPage.passwordAlertStrengthMessage).toHaveText("Password Strength: Medium"); //Se não funcionar, utilizar o selector: #password-strength-meter-label

    infoUser.password += "1"; // Strong
    await createLoginPage.passwordTextBox.setValue(infoUser.password);
    await expect(createLoginPage.passwordAlertStrengthMessage).toHaveText("Password Strength: Strong"); //Se não funcionar, utilizar o selector: #password-strength-meter-label

    infoUser.password += "xpto"; // Strong
    await createLoginPage.passwordTextBox.setValue(infoUser.password);
    await expect(createLoginPage.passwordAlertStrengthMessage).toHaveText("Password Strength: Very Strong"); //Se não funcionar, utilizar o selector: #password-strength-meter-label

    // Noticed that passwordBox is not validating properly, this means, that it's not mandatory to have at least one uppercase character (BUG)
  });

  it("X. Should fill form correctly and create account", async () => {
    //1 - Teste para preencher os campos e criar o login com sucesso -> Validar que login foi criado
    //2 - Teste para preencher os campos e criar o login com insucesso -> Validar mensagem de insucesso (não respeita o mínimo caracteres da password ou username)
    //3 - Validar o mínimo de caracteres para password (ex. min 8 carateres com 1 maiúscula, 1 minúscula, 1 carater numércio e 1 carater especial).
    //Caso falhe em alguma validação mencionada, parar de imediato o teste e informar que falta A, B, C, D...
    //4 - Validar se username é um palindrome e informar via teste que o username inserido é um Palindrome e abortar o teste
  });
});
