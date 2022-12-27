import app from '../app';
import request from 'supertest';

describe('user feature', () => {
    it('should fail for access user with no auth', () => {
        return request(app)
            .get('/user')
            .expect(401);
    });

    describe('GET /user', () => {
        it('should return default user', () => {
            return request(app)
                .get('/user/stam')
                .set('bootcamp', '1')
                .expect(200)
                .expect({name: 'Server User', email: 'test@test.org'});
        });

        it('should return empty list', () => {
            return request(app)
                .get('/user')
                .set('bootcamp', '1')
                .expect(200)
                .expect([]);
        })
    });

    describe('POST /user', () => {
        const post = () => request(app).post('/user').set('bootcamp', '1');

        it('should return the same user', () => {
            const user = {name: 'test', email: 'test'};
            return post()
                .send(user)
                .expect(200)
                .expect(user);
        });

        it('should return 400 for missing name', () => {
            return post()
                .send({email: 'test'})
                .expect(400);
        });

        it('should return 400 for missing email', () => {
            return post()
                .send({name: 'test'})
                .expect(400);
        });

        it('should return 400 for missing input', () => {
            return post()
                .send({})
                .expect(400);
        });
    });

    // todo complete tests for "put" and "delete"
});
