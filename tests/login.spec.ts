import { test } from "./fixtures/basePage";

test('Login test', async ({
    loginPage,
    todoPage
}) => {
    await loginPage.goto();
    await loginPage.fillAuthData('user', 'password')
    await loginPage.pressEnterButton()
    await todoPage.assertTodoPageOpened()
});
