import { UserService } from './users-service';
import { expect } from 'chai';

describe('UserService', () => {
    let users: UserService;
    let client: any; // remember that **ANY** is more that acceptable in tests

    beforeEach(() => {
        client = {};
        users = new UserService(client);
    });


    describe('UserService::all()', () => {
        it('should call query() with the right query', async () => {
            client.query = () => Promise.resolve({rows: []});
            const all = await users.all();
            // scalar assert
            // all.length === 0
            expect(all.length).to.equals(0);
            // object assert
            // all === [] ?!
            expect(all).to.deep.equals([]);
        });

        it('should throw error for rejected results', async () => {
            client.query = () => Promise.reject('error');
            try {
                await users.all();
                expect.fail('not suppose to get here');
            } catch (e) {
                expect(e).to.exist;
            }
        });
    });

    describe('UserService::one()', () => {

        it('should return user', async () => {
            client.query = () => Promise.resolve({rows: [{id: 'test'}, {id: 'test2'}]});
            const user = await users.one(1);
            expect(user.id).to.equals('test');
        });

        it('should throw error for no user', async () => {
            client.query = () => Promise.resolve({rows: []});
            try {
                await users.one(1);
                expect.fail('not suppose to get here');
            } catch (e) {
                expect(e).to.exist;
            }
        });
    });

    describe('UserService::save()', () => {

        it('should save a user', async () => {
            client.query = () => Promise.resolve({rows: [{id: 'test'}]});
            const user = await users.save({} as any);
            expect(user.id).to.equals('test');
        });
    });
});
