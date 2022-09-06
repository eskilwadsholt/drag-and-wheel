export type Point = {
    x: number
    y: number
}

class Calculus {
    static distance(P: Point, Q: Point) : number {
        if (P == null) return 0
        if (Q == null) return 0

        const dx = Q.x - P.x
        const dy = Q.y - P.y

        return Math.sqrt(dx**2 + dy**2)
    }
}

export { Calculus }