
export interface Client {
    get<T>(url: string): Promise<T>;
    post<T>(url: string, payload: unknown): Promise<T>;
}

export class HttpClient implements Client {

    constructor(public readonly prefix: string) {
    }

    get<T>(url: string): Promise<T> {
        return fetch(`${this.prefix}/${url}`).then(res => res.json());
    }

    post<T>(url: string, payload: unknown) {
        return fetch(`${this.prefix}/${url}`, {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(payload)
        }).then(res => res.json());
    }
}
