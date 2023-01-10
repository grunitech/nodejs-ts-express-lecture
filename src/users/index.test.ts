// importing the tool too mock
import { ImportMock } from 'ts-mock-imports';
// import the module you want to mock
import * as dbModule from '../db';

// our mock client
const MockClient: { query: any } = {
    query: null
};

// the replacement
ImportMock.mockFunction(dbModule, 'default', MockClient);

import app from '../app';
import request from 'supertest';
import { User } from './user';

// E2E (end to end) testing
// Integration test (integration of some modules instead of testing single unit)
describe('user feature', () => {
    it('should return all users', () => {
        // return Promise of "PG Result object"
        MockClient.query = () => Promise.resolve({
            rows: [
                { id: 1, password: 'A' },
                { id: 2, password: 'C' }
            ]
        });
        // routing to /user
        // then make sure we got 200 (HTTP OK)
        // then make sure we got the body we expected,
        // notice the results missing the "password" field
        return request(app)
            .get('/user')
            .expect(200)
            .expect([
                { id: 1 },
                { id: 2 }
            ]);
    });

    it('should return user by user Id', () => {
        // return Promise of "PG Result object"
        MockClient.query = () => Promise.resolve(
            { rows: [{ id: 1, password: 'A' }] }
        );

        return request(app)
            .get('/user/1')
            .expect(200)
            .expect(
                { id: 1 }
            );
    });
    it ('should delete user by its id and send back the id', () => {
MockClient.query = () => Promise.resolve(
            {rows: [{id : '1'}]}
        );

        return request(app)
            .delete('/user/1')
            .expect(200)
            .expect(
                {id: '1'}
            );
    });


    it('should return id of deleted user', () => {
        MockClient.query = () => Promise.resolve(
            { rows: [{ id: 1 }] }
        );

        return request(app)
            .delete('/user/1')
            .expect(200)
            .expect(
                { id: '1' }
            )

    });

});
