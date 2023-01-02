import { Client } from 'pg';

const config = {
    host: 'localhost',
    password: 'ziv',
    user: 'ziv',
    database: 'express'
}

const SQL = 'SELECT * FROM users WHERE email=$1 AND password=$2';

async function run() {
    const client = new Client(config);
    await client.connect();
    const response = await client.query(SQL, ['israel@example.org', '1234']);
    console.log(response.rows);
    process.exit(0);
}

run().catch(e => console.log(e));
