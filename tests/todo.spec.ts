import { expect } from "@playwright/test";
import { test } from "./fixtures/basePage";
import { allure } from "allure-playwright";
import { Severity } from "allure-js-commons";

var todoText = "";
const content = [
    "test1",
    "test2",
]

test.afterEach(async ({ page, simpleDBClient }, testInfo) => {
    await allure.step(`Clear data base after test`, async () => {
        await simpleDBClient.query(`delete from todos where content = '${todoText}'`);
        const createdTodo = await simpleDBClient.query(`select * from todos where content = '${todoText}'`)
    });

});

test.describe.parallel(async () => {
    for (const text of content) {
        test(`Create todo. Param: ${text}`, async ({
            tryLogin,
            todoPage,
            simpleDBClient
        }) => {
            await allure.parentSuite("WebUI test");
            await allure.suite("Playwright");
            await allure.subSuite("TodoPage");
            await allure.severity(Severity.CRITICAL);
            await allure.owner("scimbosh");
            await allure.tags("positive", "todo-page");
            await allure.id("2")
            await allure.description("Test of creating a note via the web and checking the creation of a record in the database");
            await allure.parameter("text of todo", text);

            todoText = text
            await todoPage.createToDo(todoText)
            await todoPage.assertTodoCreated(todoText)
            await allure.step(`Checking the creation of a record in the database`, async () => {
                await expect(async () => {
                    const createdTodo = await simpleDBClient.query(`select * from todos where content = '${todoText}'`)
                    expect(createdTodo.rows.length).toBeGreaterThan(0)
                }).toPass({ timeout: 3000 });
            });

        });

    }
});