import { Pool } from 'pg';
import { user, host, database, password } from './config';

const client = new Pool({user, host, database, password});
console.log('pg client created')
client.connect()
    .then(() => {
        console.log('pg client connected');
    })
    .catch(e => {
        console.log('unable to connect', e.toString());
        process.exit(1);
    });

export default client;
