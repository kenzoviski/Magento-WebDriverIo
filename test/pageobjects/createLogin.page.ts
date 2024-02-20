import Page from "./page.js";
import { $ } from "@wdio/globals";
import * as assert from "assert";

class CreateLogin extends Page {
  //Locators - TextLabels
  get createNewCustomerAccountTitleTextLabel() {
    return $("#maincontent > div.page-title-wrapper > h1 > span");
  }

  get personalInformationTextLabel() {
    return $("#form-validate > fieldset.fieldset.create.info > legend > span");
  }

  get firstNameTextLabel() {
    return $("#form-validate > fieldset.fieldset.create.info > div.field.field-name-firstname.required > label > span");
  }

  get lastNameTextLabel() {
    return $("#form-validate > fieldset.fieldset.create.info > div.field.field-name-lastname.required > label > span");
  }
  get signInTextLabel() {
    return $("#form-validate > fieldset.fieldset.create.account > legend > span");
  }
  get emailTextLabel() {
    return $("#form-validate > fieldset.fieldset.create.account > div:nth-child(3) > label > span");
  }
  get passwordTextLabel() {
    return $("#form-validate > fieldset.fieldset.create.account > div.field.password.required > label > span");
  }
  get passwordStrenghtTextLabel() {
    return $("#password-strength-meter");
  }

  get confirmPasswordTextLabel() {
    return $("#form-validate > fieldset.fieldset.create.account > div.field.confirmation.required > label > span");
  }

  get btnCreateAnAccount() {
    return $("#form-validate > div > div.primary > button");
  }

  //Locators - TextBoxes
  get firstNameTextBox() {
    return $("#firstname");
  }

  get lastNameTextBox() {
    return $("#lastname");
  }

  get signInInformationsTextBox() {
    return $("#form-validate > fieldset.fieldset.create.account > legend > span");
  }

  get emailTextBox() {
    return $("#email_address");
  }

  get passwordTextBox() {
    return $("#password");
  }

  get confirmPasswordTextBox() {
    return $("#password-confirmation");
  }

  //Actions

  private hasWhitespaces(str: string): boolean {
    return /\s/.test(str);
  }

  private isPasswordValidRegex(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\\/-])[A-Za-z\d@$!%*?&\\/-]{8,}$/;
    return passwordRegex.test(password);
  }

  async fieldsSetValues(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmationPassword: string,
  ) {
    const fieldValidations = [
      { field: "First Name", value: firstName },
      { field: "Last Name", value: lastName },
      { field: "Email", value: email },
      { field: "Password", value: password },
      { field: "Confirmation Password", value: confirmationPassword },
    ];

    for (const validation of fieldValidations) {
      if (this.hasWhitespaces(validation.value)) {
        assert.fail(`Whitespaces were found in ${validation.field}! Test aborted.`);
      }
    }

    if (!this.isPasswordValidRegex(password)) {
      assert.fail("Invalid characters in Password! Test aborted.");
    }

    if (password !== confirmationPassword) {
      assert.fail("Password and Confirmation Password do not match! Test aborted.");
    }

    // Restante do código para definir os valores nos campos
    await this.firstNameTextBox.setValue(firstName);
    await this.lastNameTextBox.setValue(lastName);
  }
}

export default new CreateLogin();
