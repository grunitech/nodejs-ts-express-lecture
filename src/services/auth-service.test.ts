import { sign, verify } from './auth-service';
import { expect } from 'chai';

describe('auth-service', () => {

    describe('sign', () => {
        it('should sign a password', async () => {
            const pass = 'test';
            const res = await sign(pass);
            expect(res).be.a('string');
            expect(res).not.equals(pass);
        });

        // this test will always fail:
        // each signing create new salt
        // it('should return the same signature for the same input', async () => {
        //     const a = await sign('test');
        //     const b = await sign('test');
        //     expect(a).equals(b);
        // });
    });

    describe('verify', () => {
        it('should compare encrypted and plain passwords', async () => {
            const encrypted  = await sign('test');
            expect(await verify(encrypted, 'test')).equals(true);
        });
    });
});
