import { Client } from 'pg';

let client: Client;

// this function is not testable!
export async function connect({user, host, database, password}) {
    const c = new Client({user, host, database, password});
    console.log('pg client created')
    await c.connect()
    console.log('pg client connected');
    client = c;
}


export default function db(): Client {
    if (!client) {
        throw new Error('you have to connect before calling this function');
    }
    return client;
};
