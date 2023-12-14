import { test as base } from "@playwright/test";
import LoginPage from "../pages/login.page";
import TodoPage from "../pages/todo.page";
import  SimpleDBClient  from "../utils/simpleDBClient";

type Fixtures = {
    loginPage: LoginPage;
    todoPage: TodoPage;
    tryLogin: LoginPage;
    simpleDBClient: SimpleDBClient;
}

export const test = base.extend<Fixtures>({

    //pages
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    todoPage: async ({ page }, use) => {
        await use(new TodoPage(page));
    },

    //prepare environment preparation
    tryLogin: async ({ page }, use) => {
        const loginPage = new LoginPage(page)
        await loginPage.goto();
        await loginPage.fillAuthData('user', 'password')
        await loginPage.pressEnterButton()
        await use(loginPage);
    },

    //utils
    simpleDBClient: async ({  }, use) => {
        const client = new SimpleDBClient()
        await client.connect()
        await use(new SimpleDBClient());
    },


});