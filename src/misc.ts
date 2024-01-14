export function assert(expr: boolean) {
    if (!expr) {
        const e = new Error('assertion failed!')
        if (e.stack) {
            // pop ourselves off the stack, then display the stacktrace to the user
            e.stack = e.stack?.split('\n').filter((_line, i) => i != 1).join('\n')
        }

        throw e
    }
}
