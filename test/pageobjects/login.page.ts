import Page from "./page.js";
import { $ } from "@wdio/globals";

class LoginPage extends Page {
  //Locators

  get userName() {
    return $("#email");
  }

  get password() {
    return $("#pass");
  }

  get btnSignIn() {
    return $("#send2");
  }

  get myAccount() {
    return $(
      "#maincontent > div.columns > div.column.main > div.page-title-wrapper > h1 > span"
    );
  }

  get accountInformations() {
    return $(
      "#maincontent > div.columns > div.column.main > div.block.block-dashboard-info > div.block-title > strong"
    );
  }
  get contactInformation() {
    return $(
      "#maincontent > div.columns > div.column.main > div.block.block-dashboard-info > div.block-content > div > strong > span"
    );
  }

  get contactInfo() {
    return $(
      "#maincontent > div.columns > div.column.main > div.block.block-dashboard-info > div.block-content > div > div.box-content"
    );
  }

  //Actions

  async login(userName: string, password: string) {
    await this.userName.setValue(userName);
    await this.password.setValue(password);
    await this.btnSignIn.click();
  }
}

export default new LoginPage();
