import { Client } from 'pg';

var client: Client;

export default class SimpleDBClient {

    async connect() {
        const connectionSettings =  {
            host: `${process.env.DB_HOST}`,
            user: `${process.env.DB_USER}`,
            port: `${process.env.DB_PORT}`,
            password: `${process.env.DB_PASSWORD}`,
            database: `${process.env.DB_NAME}` 
        }
        client = await new Client(connectionSettings);
        await client.connect();
    }

    async query(queryString: string): Promise<any> {
        return await client.query(queryString);
    }


}