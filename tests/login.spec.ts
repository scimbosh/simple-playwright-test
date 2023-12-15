import { test } from "./fixtures/basePage";

test('Login test', async ({
    loginPage,
    todoPage
}) => {
    await loginPage.goto();
    await loginPage.fillAuthData(`${process.env.APP_USER_NAME}`, `${process.env.APP_USER_PASSWORD}`)
    await loginPage.pressEnterButton()
    await todoPage.assertTodoPageOpened()
});
