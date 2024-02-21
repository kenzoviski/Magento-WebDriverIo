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

  // let firstName = "Thomas";
  // let lastName = "Anderson";
  // let email = "neo@matrix.com";
  // let password = "//ImTheOne1986\\";
  // let confirmPassword = password;

  it('1. Should have all the elements in the "Create New Customer Account"page', async () => {
    //Perform assertions
    await expect(browser).toHaveTitle("Create New Customer Account");
    await expect(CreateLogin.createNewCustomerAccountTitleTextLabel).toHaveText("Create New Customer Account");
    await expect(CreateLogin.personalInformationTextLabel).toHaveText("Personal Information");
    await expect(CreateLogin.firstNameTextLabel).toHaveText("First Name");
    await expect(CreateLogin.lastNameTextLabel).toHaveText("Last Name");
    await expect(CreateLogin.signInTextLabel).toHaveText("Sign-in Information");
    await expect(CreateLogin.emailTextLabel).toHaveText("Email");
    await expect(CreateLogin.passwordTextLabel).toHaveText("Password");
    await expect(CreateLogin.passwordAlertStrengthMessage).toHaveText("Password Strength: No Password");
    await expect(CreateLogin.confirmPasswordTextLabel).toHaveText("Confirm Password");
    await expect(CreateLogin.btnCreateAnAccount).toExist();
  });

  it("2. Should fill form and validate fields through regex expressions (expectValidations = false)", async () => {
    // Set values in fields and validate through code (Whitespaces, invalid characters on password, password = confirmationPassword)
    await createLoginPage.fieldsSetValues(infoUser.firstName, infoUser.lastName, infoUser.email, infoUser.password, confirmPassword, false);
  });

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

  it("4. Should fill wrong e-mail and assert with 'emailAlertMessage'", async () => {
    // E-mail should have, ex: value@domain.com
    infoUser.email = "test.com";
    const emailAlertMessage = "Please enter a valid email address (Ex: johndoe@domain.com).";

    await createLoginPage.emailTextBox.setValue(infoUser.email);
    await createLoginPage.clickCreateAnAccount();
    await expect(createLoginPage.emailAlert).toHaveText(emailAlertMessage);
  });

  it("5. Should fill password and assert password strength", async () => {});

  it("X. Should fill form correctly and create account", async () => {
    //1 - Teste para preencher os campos e criar o login com sucesso -> Validar que login foi criado
    //2 - Teste para preencher os campos e criar o login com insucesso -> Validar mensagem de insucesso (não respeita o mínimo caracteres da password ou username)
    //3 - Validar o mínimo de caracteres para password (ex. min 8 carateres com 1 maiúscula, 1 minúscula, 1 carater numércio e 1 carater especial).
    //Caso falhe em alguma validação mencionada, parar de imediato o teste e informar que falta A, B, C, D...
    //4 - Validar se username é um palindrome e informar via teste que o username inserido é um Palindrome e abortar o teste
  });
});
