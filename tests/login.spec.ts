import { test } from "./fixtures/basePage";
import { allure } from "allure-playwright"
import { Severity } from "allure-js-commons";

test('Login test', async ({
    loginPage,
    todoPage
}) => {
    await allure.parentSuite("WebUI test");
    await allure.suite("Playwright");
    await allure.subSuite("LoginPage");
    await allure.severity(Severity.CRITICAL);
    await allure.owner("scimbosh");
    await allure.tags("positive", "login-page");
    await allure.id("1")
    await allure.description("User login test");

    await loginPage.goto();
    await loginPage.fillAuthData(`${process.env.APP_USER_NAME}`, `${process.env.APP_USER_PASSWORD}`)
    await loginPage.pressEnterButton()
    await todoPage.assertTodoPageOpened()
});
