export function arrayMake<T>(length: number, fill: (i: number) => T) {
    return new Array(length).fill(null).map((_, i) => fill(i))
}

export function arrayShuffleInPlace<T>(xs: T[]): T[] {
    return xs.sort((_a, _b) => Math.random() * 2 - 1)
}
