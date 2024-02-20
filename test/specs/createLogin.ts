import { expect } from "@wdio/globals";
import CreateLogin from "../pageobjects/createLogin.page.js";
import createLoginPage from "../pageobjects/createLogin.page.js";

describe("Create new login", () => {
  beforeEach("Open app", () => {
    // Initialize the browser or any other setup code
    CreateLogin.openURL("customer/account/create/");
    // browser.maximizeWindow();  // run browser maximized
  });

  const firstNameTextLabel = "Thomas";
  const lastName = "Anderson";
  const email = "neo@matrix.com";
  const password = "//ImTheOne1986\\";
  const confirmPassword = password; //If this isn't the same, the test will fail. Change this to see validation

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
    await expect(CreateLogin.passwordStrenghtTextLabel).toHaveText("Password Strength: No Password");
    await expect(CreateLogin.confirmPasswordTextLabel).toHaveText("Confirm Password");
    await expect(CreateLogin.btnCreateAnAccount).toExist();
  });

  it("2. Should fill form and validate fields before creating account", async () => {
    //Fields don't accept whitespaces (validation in fieldsSetValues method)
    await createLoginPage.fieldsSetValues(firstNameTextLabel, lastName, email, password, confirmPassword);
  });

  it("3. Should fill form and create account", async () => {
    //1 - Teste para preencher os campos e criar o login com sucesso -> Validar que login foi criado
    //2 - Teste para preencher os campos e criar o login com insucesso -> Validar mensagem de insucesso (não respeita o mínimo caracteres da password ou username)
    //3 - Validar o mínimo de caracteres para password (ex. min 8 carateres com 1 maiúscula, 1 minúscula, 1 carater numércio e 1 carater especial).
    //Caso falhe em alguma validação mencionada, parar de imediato o teste e informar que falta A, B, C, D...
    //4 - Validar se username é um palindrome e informar via teste que o username inserido é um Palindrome e abortar o teste
  });
});
