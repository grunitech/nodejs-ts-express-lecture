import { foo, bar, getList } from './foo';

// example for tests using "jest"
describe('test the foo() function', () => {

    describe('The mighty foo() function', () => {
        it('should return 4 for input of 2, 2', () => {
            const ret = foo(2, 2);
            expect(ret).toEqual(4);
        });

        it('should return 5 for input of 2, 3', () => {
            const ret = foo(2, 3);
            expect(ret).toEqual(5);
        });

        it('should return 24 for input of 11, 13', () => {
            const ret = foo(11, 13);
            expect(ret).toEqual(24);
        });
    });

    describe('Another mighty function bar()', () => {

        it('should throw an error for input 1, 0 using try/catch', () => {
            try {
                bar(1, 0);
                fail('you are not suppose to get here');
            } catch (e) {
                expect(e.message).toEqual('zero');
            }
        });

        it('should throw an error for input 1, 0 using throws', () => {
            const f = () => bar(1, 0);
            expect(f).toThrow('zero');
        });
    });

    describe('Async testing', () => {
        // return the promise
        it('should return list with length 3', () => {
            return getList(3).then(ret => {
                expect(ret).toBeInstanceOf(Array);
                expect(typeof ret === 'object').toBeTruthy();
            });


            // example for instance of vs typeof
            // class Foo {
            //     foo: number = 1;
            // }
            //
            // const a = {foo: 1};
            // const b = new Foo();
            // expect(a.foo).toEqual(b.foo);
            //
            // expect(a).toHaveProperty('foo', 1);
            // expect(b).toHaveProperty('foo');
            //
            // expect(b).toBeInstanceOf(Foo);
            // expect(a).not.toBeInstanceOf(Foo);
        });

        // call done() to finish the test
        it('should return empty list', (done) => {
            getList(0).then(ret => {
                expect(ret).toHaveLength(0);
                done();
            });
        });

        it('should throw an error for negative number', (done) => {
            getList(-1)
                .then(() => done('not suppose to get here'))
                .catch((e) => {
                    expect(e.message).toEqual('i must be greater than zero');
                    done();
                });
        });

        // using async/await
        it('should throw', async () => {
            const f = () => getList(1.2);
            // we use rejects/resolves with await
            await expect(f).rejects.toThrow();


            // const b = () => getList(1);
            // await expect(b).resolves.toHaveLength(1);
        });

    });
});

