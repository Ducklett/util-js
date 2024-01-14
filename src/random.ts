export function randomFloat(min: number, max: number): number {
    return min + Math.random() * (max - min)
}

export function randomIntExclusive(from: number, toExclusive: number): number {
    return from + Math.floor(Math.random()) * (toExclusive - from)
}

export function randomIntInclusive(from: number, toInclusive: number): number {
    return from + Math.round(Math.random()) * (toInclusive - from)
}

export function randomChar(legal: string) {
    const i = randomIntExclusive(0, legal.length)
    return legal[i]
}
