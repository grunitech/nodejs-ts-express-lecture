export function foo(a: number, b: number) {
    return a + b;
}

export function bar(a: number, b: number) {
    if (0 === b) {
        throw new Error('zero');
    }
    return a / b;
}

export async function getList(i: number): Promise<number[]> {
    if (i < 0) {
        throw new Error('i must be greater than zero');
    }
    if (i !== Math.round(i)) {
        throw new Error('i must be integer');
    }
    const arr = [];
    for (let a = 0; a < i; ++a) {
        arr.push(a);
    }
    return arr;
}
