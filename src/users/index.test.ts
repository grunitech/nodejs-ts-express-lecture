import user from './index';
import request from 'supertest';

describe('user feature', () => {
    it('should fail for access user with no auth', () => {
        return request(user)
            .get('/')
            .expect(401);
    });
});
