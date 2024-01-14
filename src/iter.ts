/**
 * returns a range between {from} and {toExclusive}, going either up or down
 * @param from the starting number or character
 * @param toInclusive the ending number or character
 * @param step the step by which to increment
 */
export function* range<T extends number | string>(from: T, toInclusive: T, step: number = 1) {
    const isString = typeof from === 'string'
    if (isString && typeof toInclusive !== 'string') {
        throw new Error('types of from and toExclusive should match')
    }

    let fromNum, toNum

    if (isString) {
        fromNum = (from as string).charCodeAt(0)
        toNum = (toInclusive as string).charCodeAt(0)
    } else {
        fromNum = from
        toNum = toInclusive
    }

    step = Math.abs(step)

    if (from < toInclusive) {
        for (let i = fromNum; i <= toNum; i += step) {
            yield isString ? String.fromCharCode(i) : i
        }
    } else {
        for (let i = fromNum; i >= toNum; i -= step) {
            yield isString ? String.fromCharCode(i) : i
        }
    }
}

export function* repeat<T>(v: T): Generator<T> {
    while (true) {
        yield v
    }
}


export function sum(xs: Iterable<number>): number {
    let acc = 0
    for (let x of xs) acc += x
    return acc
}

export function* take<T>(xs: Iterable<T>, lim: number): Generator<T> {
    let i = 0;
    for (let x of xs) {
        if (i >= lim) break
        yield x
        i++
    }
}

export function* iterMap<T>(xs: Iterable<T>, f: (v: T, i: number) => T): Generator<T> {
    let i = 0;
    for (let x of xs) {
        yield f(x, i)
        i++
    }
}

export function* iterFilter<T>(xs: Iterable<T>, f: (v: T, i: number) => T): Generator<T> {
    let i = 0;
    for (let x of xs) {
        if (f(x, i)) {
            yield f(x, i)
        }
        i++
    }
}

export function iterFold<T, U>(xs: Iterable<T>, initial: U, f: (acc: U, v: T) => U): U {
    const iterator = xs[Symbol.iterator]();

    let result = iterator.next();
    let acc = initial

    while (!result.done) {
        acc = f(acc, result.value)
        result = iterator.next();
    }
    return acc
}

export function iterFold2<T, U>(xs: Iterable<T>, f: (acc: U, v: T) => U): U {
    const iterator = xs[Symbol.iterator]();

    let result = iterator.next();
    let acc = result.value

    if (result.done) {
        return acc
    }

    result = iterator.next();

    while (!result.done) {
        acc = f(acc, result.value)
        result = iterator.next();
    }
    return acc
}
