// this line came from the documentation
// const { Client } = require('pg')
import { Client } from 'pg';

const config = {
    host: 'localhost',
    password: 'ziv',
    user: 'ziv',
    database: 'express'
}
const SQL = 'SELECT * FROM users';

// then syntax of the same "run" function
// const client = new Client(config);
// client.connect()
//     .then(() => client.query(SQL))
//     .then(response => {
//         console.log('response', response.rows);
//         return client.end();
//     })
//     .then(() => process.exit(0));

async function run() {
    // create PG client
    const client = new Client(config);
    // connecting to database I/O
    await client.connect();
    console.log('connected');
    // querying the database
    console.log('query', SQL);
    const response = await client.query(SQL);
    console.log('response', response.rows);
    // closing connection
    await client.end();
    // exit the app
    process.exit(0);
}

run().catch(e => console.log(e));
