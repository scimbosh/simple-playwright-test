import { test as base } from "@playwright/test";
import LoginPage from "../pages/login.page";
import TodoPage from "../pages/todo.page";

type Fixtures = {
    loginPage: LoginPage;
    todoPage: TodoPage;
    tryLogin: LoginPage;
}

export const test = base.extend<Fixtures>({

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    todoPage: async ({ page }, use) => {
        await use(new TodoPage(page));
    },

    tryLogin: async ({ page }, use) => {
        const loginPage = new LoginPage(page)
        await loginPage.goto();
        await loginPage.fillAuthData('user', 'password')
        await loginPage.pressEnterButton()
        await use(loginPage);
    },

});