import { log } from "console";
import { test } from "./fixtures/basePage";
import { chromium, expect } from "@playwright/test";

// test.beforeAll('do this after each test ends', async ({ 
//     loginSteps
// }) => {
//     console.log('Run After Each Test Step')
//     loginSteps.tryLogin()
// });


test('Create todo', async ({
    tryLogin,
    todoPage
}) => {

    const todoText = "test1";
    await todoPage.createToDo(todoText)
    await todoPage.assertTodoCreated(todoText)
    
});
