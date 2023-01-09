import { Client, HttpClient } from './client';


const myClient = new HttpClient('http://localhost:3003');

export function stam(client: Client, id: string) {
    return client.get(`user/${id}`);
}

export function anotherStam(client: Client) {
    return client.get(`user`);
}

class Stam {
    constructor(public readonly client: Client) {
    }

    doSomething() {
        return this.client.post('user', {});
    }
}
