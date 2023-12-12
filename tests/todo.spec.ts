import { test } from "./fixtures/basePage";

test('Create todo', async ({
    tryLogin,
    todoPage
}) => {
    const todoText = "test1";
    await todoPage.createToDo(todoText)
    await todoPage.assertTodoCreated(todoText)

});
