import { test as base } from "@playwright/test";
import LoginPage from "../pages/login.page";
import TodoPage from "../pages/todo.page";

export const test = base.extend<{
    loginPage: LoginPage;
    todoPage: TodoPage;
}>({

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    todoPage: async ({ page }, use) => {
        await use(new TodoPage(page));
    },

});