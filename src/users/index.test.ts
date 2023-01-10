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

// E2E (end to end) testing
// Integration test (integration of some modules instead of testing single unit)
describe('user feature', () => {

    it('should return all users', () => {
        // return Promise of "PG Result object"
        MockClient.query = () => Promise.resolve({
            rows: [
                {id: 1, password: 'A'},
                {id: 2, password: 'C'}
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
                {id: 1},
                {id: 2}
            ]);
    });

     it('should return user', () => {
        // return Promise of "PG Result object"
        MockClient.query = () => Promise.resolve({
            rows: [
                {id: 1, password: 'A'},
                {id: 2, password: 'C'}
            ]
        });
        return request(app)
            .get('/user/1')
            .expect(200)
            .expect(
                {id: 1}
            );
    });
});
