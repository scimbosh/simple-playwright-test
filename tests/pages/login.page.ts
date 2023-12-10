import { Page } from "@playwright/test";

export default class LoginPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    loginInput = () => this.page.getByPlaceholder('LOGIN');
    passwordInput = () => this.page.getByPlaceholder('PASSWORD');
    enterButton = () => this.page.getByText('ENTER');

    public async fillAuthData(login: string, password: string) {
        await this.loginInput().fill(login)
        await this.passwordInput().fill(password)
    }

    public async pressEnterButton() {
        await this.enterButton().click()
    }

    public async goto() {
        await this.page.goto("http://localhost:4200")
    }

}