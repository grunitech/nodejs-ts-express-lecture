import { expect } from 'chai';

const sum = (a, b) => a + b;

const anything = [
    ['a', 'b', 'ab'],
    [1, 2, 3],
    [4, 5, 9],
    ['a', 0, 'a0'],
    ['01', '0', '01']
]

describe('stam', () => {

    it.each(anything, ('should sum a,b', (a, b,c) => {
       expect(sum(a, b)).toEquals(c);
    });
})
