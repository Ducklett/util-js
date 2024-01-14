import { iterFold2, repeat, sum } from "./iter"

export function clamp(val: number, lo: number, hi: number): number {
    return Math.min(hi, Math.max(lo, val))
}

export function lerpUnclamped(a: number, b: number, t: number): number {
    return (1 - t) * a + t * b
}

export function lerp(a: number, b: number, t: number): number {
    t = clamp(t, 0, 1)
    return lerpUnclamped(a, b, t)
}

export function inverseLerpUnclamped(a: number, b: number, c: number): number {
    return (c - a) / (b - a)
}

export function inverseLerp(a: number, b: number, c: number): number {
    c = a < b ? clamp(c, a, b) : clamp(c, b, a)
    return (c - a) / (b - a)
}

export function remapUnclamped(val: number, fromA: number, fromB: number, toA: number, toB: number): number {
    const t = inverseLerpUnclamped(fromA, fromB, val)
    return lerpUnclamped(toA, toB, t)
}

export function remap(val: number, fromA: number, fromB: number, toA: number, toB: number): number {
    const t = inverseLerp(fromA, fromB, val)
    return lerp(toA, toB, t)
}

function* vecOp1<T>(a: Iterable<T>, op: (v: T) => T): Generator<T> {
    for (let v of a) {
        yield op(v)
    }
}

function* vecOp2<T>(a: Iterable<T>, b: Iterable<T>, op: (v1: T, v2: T) => T): Generator<T> {
    const aIterator = a[Symbol.iterator]();
    const bIterator = b[Symbol.iterator]();

    let aResult = aIterator.next();
    let bResult = bIterator.next();

    while (!aResult.done && !bResult.done) {
        yield op(aResult.value, bResult.value)
        aResult = aIterator.next();
        bResult = bIterator.next();
    }
}

function* vecOp3<T>(a: Iterable<T>, b: Iterable<T>, c: Iterable<T>, op: (v1: T, v2: T, v3: T) => T): Generator<T> {
    const aIterator = a[Symbol.iterator]();
    const bIterator = b[Symbol.iterator]();
    const cIterator = c[Symbol.iterator]();

    let aResult = aIterator.next();
    let bResult = bIterator.next();
    let cResult = cIterator.next();

    while (!aResult.done && !bResult.done && !cResult.done) {
        yield op(aResult.value, bResult.value, cResult.value)
        aResult = aIterator.next();
        bResult = bIterator.next();
        cResult = bIterator.next();
    }
}

type Vec = Iterable<number>

export function vecAdd(a: Vec, b: Vec | number): Generator<number> { return typeof b === 'number' ? vecOp1(a, v => v + b) : vecOp2(a, b, (v1, v2) => v1 + v2) }
export function vecSub(a: Vec, b: Vec | number): Generator<number> { return typeof b === 'number' ? vecOp1(a, v => v - b) : vecOp2(a, b, (v1, v2) => v1 - v2) }
export function vecDiv(a: Vec, b: Vec | number): Generator<number> { return typeof b === 'number' ? vecOp1(a, v => v / b) : vecOp2(a, b, (v1, v2) => v1 / v2) }
export function vecMul(a: Vec, b: Vec | number): Generator<number> { return typeof b === 'number' ? vecOp1(a, v => v * b) : vecOp2(a, b, (v1, v2) => v1 * v2) }

export function vecAbs(a: Vec): Generator<number> { return vecOp1(a, v => Math.abs(v)) }
export function vecSign(a: Vec): Generator<number> { return vecOp1(a, v => Math.sign(v)) }
export function vecSin(a: Vec): Generator<number> { return vecOp1(a, v => Math.sin(v)) }
export function vecCos(a: Vec): Generator<number> { return vecOp1(a, v => Math.cos(v)) }
export function vecFloor(a: Vec): Generator<number> { return vecOp1(a, v => Math.floor(v)) }
export function vecRound(a: Vec): Generator<number> { return vecOp1(a, v => Math.round(v)) }
export function vecCeil(a: Vec): Generator<number> { return vecOp1(a, v => Math.ceil(v)) }
export function vecMod(a: Vec, b: Vec | number): Generator<number> { return typeof b === 'number' ? vecOp1(a, v => v % b) : vecOp2(a, b, (v1, v2) => v1 % v2) }
export function vecMin(a: Vec, b: Vec | number): Generator<number> { return typeof b === 'number' ? vecOp1(a, v => Math.min(v, b)) : vecOp2(a, b, (v1, v2) => Math.min(v1, v2)) }
export function vecMax(a: Vec, b: Vec | number): Generator<number> { return typeof b === 'number' ? vecOp1(a, v => Math.max(v, b)) : vecOp2(a, b, (v1, v2) => Math.max(v1, v2)) }
export function vecClamp(v: Vec, lo: Vec | number, hi: Vec | number): Generator<number> { return vecOp3(v, typeof lo === 'number' ? repeat(lo) : lo, typeof hi === 'number' ? repeat(hi) : hi, (v, lo, hi) => clamp(v, lo, hi)) }
export function vecPow(a: Vec, b: Vec | number): Generator<number> { return typeof b === 'number' ? vecOp1(a, v => Math.pow(v, b)) : vecOp2(a, b, (v1, v2) => Math.pow(v1, v2)) }

export function vecLerpUnclamped(a: Vec, b: Vec, t: Vec | number): Generator<number> { return vecOp3(a, b, typeof t === 'number' ? repeat(t) : t, (a, b, t) => lerpUnclamped(a, b, t)) }
export function vecLerp(a: Vec, b: Vec, t: Vec | number): Generator<number> { return vecOp3(a, b, typeof t === 'number' ? repeat(t) : t, (a, b, t) => lerp(a, b, t)) }
export function vecInverseLerpUnclamped(a: Vec, b: Vec, t: Vec | number): Generator<number> { return vecOp3(a, b, typeof t === 'number' ? repeat(t) : t, (a, b, t) => inverseLerpUnclamped(a, b, t)) }
export function vecInverseLerp(a: Vec, b: Vec, t: Vec | number): Generator<number> { return vecOp3(a, b, typeof t === 'number' ? repeat(t) : t, (a, b, t) => inverseLerp(a, b, t)) }

export function vecMaxComp(xs: Vec): number { return iterFold2(xs, (a, b) => Math.max(a, b)) }
export function vecMinComp(xs: Vec): number { return iterFold2(xs, (a, b) => Math.min(a, b)) }

export function magnitude(xs: Vec) {
    let acc = 0
    for (let x of xs) {
        acc += x * x
    }
    return Math.sqrt(acc)
}

export function SquareMagnitude(xs: Vec) {
    let acc = 0
    for (let x of xs) {
        acc += x * x
    }
    return acc
}

export function distance(a: Vec, b: Vec): number {
    return magnitude(vecSub(a, b))
}

export function squareDistance(a: Vec, b: Vec): number {
    return SquareMagnitude(vecSub(a, b))
}

export function manhattanDistance(a: Vec, b: Vec): number {
    return sum(vecAbs(vecSub(a, b)))
}

export function maxNormDistance(a: Vec, b: Vec): number {
    return vecMaxComp(vecSub(a, b))
}
