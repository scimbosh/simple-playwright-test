import { Page } from "@playwright/test";
import { allure } from "allure-playwright";

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
        await allure.step(`Open ${process.env.URL}`, async () => {
            await this.page.goto(`${process.env.URL}`)
        });
    }

    public async fillAuthData(login: string, password: string) {
        await allure.step(`Fill in the login and password fields`, async () => {
            await this.loginInput().fill(login)
            await this.passwordInput().fill(password)
        });
    }

    public async pressEnterButton() {
        await allure.step(`Click on the Enter button`, async () => {
            await this.enterButton().click()
        });
    }

}