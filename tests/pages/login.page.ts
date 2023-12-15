import { Page } from "@playwright/test";

export default class LoginPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    //Selectors
    loginInput = () => this.page.getByPlaceholder('LOGIN');
    passwordInput = () => this.page.getByPlaceholder('PASSWORD');
    enterButton = () => this.page.getByText('ENTER');

    //Actions
    public async goto() {
        await this.page.goto(`${process.env.URL}`)
    }

    public async fillAuthData(login: string, password: string) {
        await this.loginInput().fill(login)
        await this.passwordInput().fill(password)
    }

    public async pressEnterButton() {
        await this.enterButton().click()
    }

}