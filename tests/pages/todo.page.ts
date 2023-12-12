import { expect, Locator, Page } from "@playwright/test";

export default class TodoPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    heading = () => this.page.locator('h1');
    todoInput = () => this.page.getByPlaceholder('Add a new todo content ');
    addButton = () => this.page.getByText('ADD');
    todoItems = () => this.page.getByRole('listitem');
    checkboxInItems = (text: string): Locator =>
        this.page.locator(`//*[(./span[text() = "${text}"])]/input[@type="checkbox"]`);


    public async goto() {
        await this.page.goto("http://localhost:4200/todo")
    }

    public async pressAddButton() {
        await this.addButton().click();

    }

    public async fullTodo(text: string) {
        await this.todoInput().fill(text);
    }

    public async createToDo(text: string) {
        await this.fullTodo(text);
        await this.pressAddButton();
    }

    public async assertTodoPageOpened() {
        await expect(this.heading()).toBeVisible();
    }

    public async assertTodoCreated(text: string) {
        await expect(this.todoItems().filter({ hasText: text })).toBeVisible
        //await this.checkboxInItems(text).click()
    }

}