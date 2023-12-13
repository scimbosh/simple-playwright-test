import { Client } from 'pg';

var client: Client;

export default class SimpleDBClient {

    async connect() {
        const connectionSettings =  {
            host: "localhost",
            user: "postgres",
            port: 5432, //Please insert your valid port form your PostgreSQL DB
            password: "postgres", // Your password
            database: "restserverfortest" // Your name of database
        }
        client = await new Client(connectionSettings);
        await client.connect();
    }


    async query(queryString: string): Promise<any> {
        return await client.query(queryString);
    }


}