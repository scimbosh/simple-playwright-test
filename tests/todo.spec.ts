import { expect } from "@playwright/test";
import { test } from "./fixtures/basePage";
import exp from "constants";

var todoText = "";
const content = [
    "test1",
    "1242356",
]

test.afterEach(async ({ page, simpleDBClient }, testInfo) => {
    console.log(`todoText = ${todoText}`)
    
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);
    if (testInfo.status !== testInfo.expectedStatus)
        console.log(`Did not run as expected, ended up at ${page.url()}`);
    //Clear data base after test
    await simpleDBClient.query(`delete from todos where content = '${todoText}'`);
    const createdTodo = await simpleDBClient.query(`select * from todos where content = '${todoText}'`)
    console.log(createdTodo.rows)

});


for (const text of content) {
    test(`Create todo. Param: ${text}`, async ({
        tryLogin,
        todoPage,
        simpleDBClient
    }) => {
        todoText = text
        await todoPage.createToDo(todoText)
        await todoPage.assertTodoCreated(todoText)

        await expect(async () => {
            const createdTodo = await simpleDBClient.query(`select * from todos where content = '${todoText}'`)
            expect(createdTodo.rows.length).toBeGreaterThan(0)
        }).toPass({timeout: 3000});

    });

}

