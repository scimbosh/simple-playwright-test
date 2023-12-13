import { test } from "./fixtures/basePage";

const todoText = "test1";

test.afterEach(async ({ page, simpleDBClient }, testInfo ) => {
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);
    if (testInfo.status !== testInfo.expectedStatus)
        console.log(`Did not run as expected, ended up at ${page.url()}`);
   //Clear data base after test
   await simpleDBClient.query(`delete from todos where content = '${todoText}'`);
   const createdTodo = await simpleDBClient.query(`select * from todos where content = '${todoText}'`)
   console.log(createdTodo.rows)

});

test('Create todo', async ({
    tryLogin,
    todoPage,
    simpleDBClient
}) => {
    await todoPage.createToDo(todoText)
    await todoPage.assertTodoCreated(todoText)
    const createdTodo = await simpleDBClient.query(`select * from todos where content = '${todoText}'`)
    console.log("Created row: ")
    console.log(createdTodo.rows)
});


