import { expect } from 'chai';
import { foo } from './foo';

describe('test the foo() function', () => {

    describe('those are dummy tests', () => {
        it('this is dummy test', () => {

        });
    });

    describe('The mighty foo() function', () => {
        it('should return 4 for input of 2, 2', () => {
            const ret = foo(2, 2);
            expect(ret).to.equal(4);
        });

        it('should return 5 for input of 2, 3', () => {
            const ret = foo(2, 3);
            expect(ret).to.equal(5);
        });

        it('should return 24 for input of 11, 13', () => {
            const ret = foo(11, 13);
            expect(ret).to.equal(24);
        });
    });
});

