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
