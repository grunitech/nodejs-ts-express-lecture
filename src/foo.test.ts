import { expect } from 'chai';
import { foo, bar, getList } from './foo';

describe('test the foo() function', () => {

    describe('those are dummy tests', () => {
        it('this is dummy test', () => {
        });
    });

    describe('typing', () => {
        class Typer {
            foo = 1;
        }

        it('should check typeof', () => {
            expect(typeof 'str').to.equal('string');
            expect(typeof 1).to.equal('number');
        });

        it('should check instance of', () => {
            const a = new Typer();
            const b = {foo: 1};

            expect(a.foo).to.equal(b.foo);
            expect(a instanceof Typer).to.be.true;
            expect(b instanceof Typer).to.be.false;
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

    describe('Another mighty function bar()', () => {
        it('should return 1 for inputs 1,1', () => {
            const ret = bar(1, 1);
            expect(ret).to.equal(1);
        });

        it('should return 2 for inputs 4,2', () => {
            const ret = bar(4, 2);
            expect(ret).to.equal(2);
        });

        it('should throw an error for input 1, 0 using try/catch', () => {
            try {
                bar(1, 0);
                expect.fail('you are not suppose to get here');
            } catch (e) {
                expect(e.message).to.equal('zero');
            }
        });

        it('should throw an error for input 1, 0 using throws', () => {
            const f = () => bar(1, 0);
            expect(f).to.throws('zero');
        });
    });
});

describe('Async testing', () => {
    // return the promise
    it('should return list with length 3', () => {
        return getList(3).then(ret => {
            expect(ret).to.be.an('array');
            expect(ret).to.not.be.a('string');
            expect(ret).to.have.lengthOf(3);
            expect(ret[0]).to.equals(0);
            expect(ret[1]).to.equals(1);
            expect(ret[2]).to.equals(2);
        });
    });

    // call done() to finish the test
    it('should return empty list', (done) => {
        getList(0).then(ret => {
            expect(ret).to.have.lengthOf(0);
            done();
        });
    });

    it('should throw an error for negative number', (done) => {
        getList(-1)
            .then(() => {
                done('not suppose to get here');
            })
            .catch((e) => {
                expect(e.message).to.equals('i must be greater than zero');
                done();
            });
    });

    // using async/await
    it('should return list', async () => {
        const ret = await getList(0);
        expect(ret.length).to.equals(0);
        expect(ret).to.have.lengthOf(0);
    });


    it('should throw error for float number', async () => {
        try {
            await getList(1.2);
            expect.fail('not suppose to get here');
        } catch (e) {
            expect(e).to.have.property('message');
            expect(e.message).to.be.not.empty;
            expect(e.message).to.equals('i must be integer');
        }
    });
});

