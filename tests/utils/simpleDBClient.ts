import { Client } from 'pg';
import { allure } from "allure-playwright"

var client: Client;

export default class SimpleDBClient {

    async connect() {
        await allure.step(`Create a new database connection`, async () => {
            const connectionSettings = {
                host: `${process.env.DB_HOST}`,
                user: `${process.env.DB_USER}`,
                port: `${process.env.DB_PORT}`,
                password: `${process.env.DB_PASSWORD}`,
                database: `${process.env.DB_NAME}`
            }
            client = await new Client(connectionSettings);
            await client.connect();
        });
    }

    async query(queryString: string): Promise<any> {
        return await allure.step(`Run SQL-query: ${queryString}`, async () => {
            return await client.query(queryString);
        });
    }

}