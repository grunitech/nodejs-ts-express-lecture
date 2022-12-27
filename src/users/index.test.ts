import app from '../app';
import request from 'supertest';
import { expect } from 'chai';

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
                .expect(400)
                .expect({message: 'missing name'});
        });

        it('should return 400 for missing email', () => {
            return post()
                .send({name: 'test'})
                .expect(400)
                .expect({message: 'missing email'});
        });

        it('should return 400 for missing input', () => {
            return post()
                .send({})
                .expect(400)
                .expect(res => {
                    const a = res.body;
                });
                // .expect({message: 'missing inputs'});
        });
    });

    describe('DELETE /user/:id', () => {
        it('should return deletion message', () => {
            return request(app)
                .delete('/user/stam')
                .set('bootcamp', '1')
                .expect(200)
                // .expect({message: 'user stam deleted'})
                .expect(res => {
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equals('user stam deleted');
                });
        });
    });

    describe('PUT /user', () => {
        it('should fail for invalid  input', (done) => {
            request(app)
                .put('/user')
                .set('bootcamp', '1')
                .send({email: 'test'})
                .expect(400)
                .end(() => {
                    done();
                });
        });

        it('should return saved message', () => {
            return request(app)
                .put('/user')
                .set('bootcamp', '1')
                .send({email: 'test', name: 'test'})
                .expect(200)
                .expect({userUpdated: true});
        });
    });

});
