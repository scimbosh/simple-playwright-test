import { expect, Locator, Page } from "@playwright/test";
import { allure } from "allure-playwright"

export default class TodoPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    //Selectors
    heading = () => this.page.locator('h1');
    todoInput = () => this.page.getByPlaceholder('Add a new todo content ');
    addButton = () => this.page.getByText('ADD');
    todoItems = () => this.page.getByRole('listitem');
    checkboxInItems = (text: string): Locator =>
        this.page.locator(`//*[(./span[text() = "${text}"])]/input[@type="checkbox"]`);

    //Actions
    public async goto() {
        await allure.step(`Open page ${process.env.URL}/todo`, async () => {
            await this.page.goto(`${process.env.URL}/todo`)
        });
    }

    public async pressAddButton() {
        await allure.step("Сlick on the add button", async () => {
            await this.addButton().click();
        });
    }

    public async fullTodo(text: string) {
        await allure.step("Fill in the text", async () => {
            await this.todoInput().fill(text);
        });
    }

    public async createToDo(text: string) {
        await allure.step("Create todo", async () => {
            await this.fullTodo(text);
            await this.pressAddButton();
        });
    }

    public async assertTodoPageOpened() {
        await allure.step("Check that the TODO page is open", async () => {
            await expect(this.heading()).toBeVisible();
        });

    }

    public async assertTodoCreated(text: string) {
        await allure.step("Check that the note has been created", async () => {
            await expect(this.todoItems().filter({ hasText: text })).toBeVisible
        });   
    }

}