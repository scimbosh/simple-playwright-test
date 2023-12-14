import { expect } from "@playwright/test";
import { test } from "./fixtures/basePage";



var todoText = "";
const content = [
    "test1",
    "1242356",
]

test.afterEach(async ({ page, simpleDBClient }, testInfo) => {

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

