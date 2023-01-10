import { expect } from 'chai';
import { User, validateFullUser, validateUser } from './user';

describe('user', () => {

    describe('validateUser', () => {
        const u: User = {
            password: 'test12',
            email: 'test@test.com',
            fname: 'test',
            lname: 'test'
        };

        it('should return user', () => {
            expect(validateUser(u)).to.equals(u);
        });

        it('should fail for missing password', () => {
            const {password, ...user} = u;
            expect(() => validateUser(user)).to.throws();
        });
    });


    describe('validateFullUser', () => {
        const u: User = {
            id: 1,
            password: 'test12',
            email: 'test@test.com',
            fname: 'test',
            lname: 'test'
        }

        it('should return user', () => {
            expect(validateFullUser(u)).to.equals(u);
        });

        it('should fail for invalid email', () => {
            const user = {...u, email: 'test'};
            expect(() => validateFullUser(user)).to.throws();
        });

    });
});
