import { log } from "console";
import { test } from "./fixtures/basePage";
import { chromium, expect } from "@playwright/test";

test.afterEach('do this after each test ends', async ({ 
    page
}) => {
    console.log('Run After Each Test Step')
});


test('Create todo', async ({
    loginPage,
    todoPage
}) => {


    await loginPage.goto();
    await loginPage.fillAuthData('user', 'password')
    await loginPage.pressEnterButton()
    await todoPage.assertTodoPageOpened()

    const todoText = "test1";
    await todoPage.createToDo(todoText)
    await todoPage.assertTodoCreated(todoText)

    
});
