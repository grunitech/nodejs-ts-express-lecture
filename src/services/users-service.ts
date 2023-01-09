import type { Client } from 'pg';
import db from '../db';

export interface User {
    id?: number;
    email: string;
    fname: string;
    lname: string;
    password: string;
}

const SELECT_ALL = 'SELECT * FROM users';
const SELECT_BY_ID = 'SELECT * FROM users WHERE id=$1 LIMIT 1';
const INSERT_ONE = 'INSERT INTO users (email, fname, lname, password) VALUES ($1, $2, $3, $4) RETURNING *';

// What about testing services like that?!

export class UserService {
    constructor(public readonly client: Client) {
    }

    async all(): Promise<User[]> {
        const result = await this.client.query(SELECT_ALL);
        return result.rows;
    }

    async one(id: number | string): Promise<User> {
        const result = await this.client.query(SELECT_BY_ID, [id]);
        if (result.rows.length === 0) {
            throw new Error('unable to find this user');
        }
        return result.rows[0];
    }

    async save({email, fname, lname, password}: User) {
        // NOTE:
        // this asserts make sure there is no another user with the same email
        // we comment this section out since we defined the "email" field in the database as unique
        //
        // const user = await this.client.query('select id from users where email=$1', [email]);
        // if (user.rows.length) {
        //     throw new Error('unable to add duplicate email');
        // }
        const rows = await this.client.query(INSERT_ONE, [email, fname, lname, password]);
        return rows;
    }
}












export default function factory() {
    return new UserService(db());
}
