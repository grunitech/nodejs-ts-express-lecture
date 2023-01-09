import type { Client } from 'pg';
import { User } from '../users/user';
import db from '../db';

const SELECT_ALL = 'SELECT * FROM users';
const SELECT_BY_ID = 'SELECT * FROM users WHERE id=$1';
const INSERT_ONE = 'INSERT INTO users (email, fname, lname, password) VALUES ($1, $2, $3, $4) RETURNING *';

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
        const rows = await this.client.query(INSERT_ONE, [email, fname, lname, password]);
        return rows;
    }
}

export default function factory() {
    return new UserService(db());
}
