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
const UPDATE_ONE = 'UPDATE users SET email=$2, fname=$3, lname=$4, password=$5 WHERE id=$1 RETURNING *';
const REMOVE_ONE = 'DELETE FROM users WHERE id=$1'

// What about testing services like that?!

// this service let us access the "users" table in the database
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

    async save({ email, fname, lname, password }: User) {
        // NOTE:
        // this asserts make sure there is no another user with the same email
        // we comment this section out since we defined the "email" field in the database as unique
        //
        const user = await this.client.query('select id from users where email=$1', [email]);
        if (user.rows.length) {
            throw new Error('unable to add duplicate email');
        }
        const result = await this.client.query(INSERT_ONE, [email, fname, lname, password]);
        return result.rows[0];
    }

    // todo missing tests
    async update({ id, email, fname, lname, password }: User) {
        const results = await this.client.query(UPDATE_ONE, [id, email, fname, lname, password]);
        return results.rows[0];
    }

    // todo missing tests
    async remove(id: number | string) {
        await this.client.query(REMOVE_ONE, [id]);
        return id;
    }
}


let userService: UserService;

export default function getUserService() {
    if (!userService) {
        userService = new UserService(db());
    }
    return userService;
}
