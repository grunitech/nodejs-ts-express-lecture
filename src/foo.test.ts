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
    });
});

