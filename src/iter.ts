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
