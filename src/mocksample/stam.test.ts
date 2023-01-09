import { Client, HttpClient } from './client';
import { anotherStam, stam } from './stam';
import { expect } from 'chai';


const sum = (a, b) => a + b;

describe('stam', () => {

    it('should sum anything', () => {
        const anything = [
            ['a', 'b', 'ab'],
            [1, 2, 3],
            [4, 5, 9],
            ['a', 0, 'a0'],
            ['01', '0', '01']
        ]
        anything.forEach(([a, b, res]) => {
            expect(sum(a, b)).to.equals(res);
        })

    })

    it('should sum 1, 2', () => {
        expect(sum(1, 2)).to.equals(3);
    })

    let client: Client;

    beforeEach(() => {
        client = {} as unknown as Client;
    });

    afterEach(() => {
        client = null;
    })

    it('testing the stam function', async () => {
        client.get = (input) => Promise.resolve(input) as any;
        const res = await stam(client, '1');

        expect(res).to.equals('user/1');
    });

    it('testing the stam function if the get throws', async () => {
        client.get = (input) => Promise.reject('error') as any;

        try {
            await stam(client, '1');
            expect.fail('not suppose to enter this section');
        } catch (e) {

        }
    });

    it('should test another stam', async () => {
        client.get = (input: string) => Promise.resolve(input) as any;

        expect(await anotherStam(client)).to.equals('user');
    });

    it('should test another stam with error', async () => {
        client.get = (input: string) => {
            throw new Error('');
        };

        expect(await (async () => await anotherStam(client))).to.throws;
    });
})
