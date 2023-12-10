import { expect, Page } from "@playwright/test";

export default class TodoPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async goto() {
        await this.page.goto("http://localhost:4200/todo")
    }

    heading = () => this.page.locator('h1');

    public async assertTodoPageOpened() {
        await expect(this.heading()).toBeVisible();
    }


}