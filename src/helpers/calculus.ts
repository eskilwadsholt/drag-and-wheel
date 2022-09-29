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

    static len = (P: Point) : number => {
        const dx = P.x
        const dy = P.y

        return Math.sqrt(dx**2 + dy**2)
    }

    static vector(start: Point, end: Point) {
        const dx = end.x - start.x
        const dy = end.y - start.y

        return {
            x: dx,
            y: dy
        }
    }

    static clamp(value: number, min: number, max: number) {
        if (value < min) return min
        if (value > max) return max

        return value
    }

    static angle(A: Point, B: Point, C: Point) {
        const v1: Point = this.vector(B, A)
        const v2: Point = this.vector(B, C)
        const dot = v1.x * v2.x + v1.y * v2.y
        const det = v1.y * v2.x - v1.x * v2.y
        const denominator = this.len(v1) * this.len(v2)

        if (denominator == 0) return 0

        const cos = Calculus.clamp(dot / denominator, -1, 1)
        const primaryAngle = Math.acos(cos)

        if (det > 0) return primaryAngle

        return 2 * Math.PI - primaryAngle
    }
}

declare global {
    interface Number {
        toDegrees(): number
        toRadians(): number
    }
}

Number.prototype.toDegrees = function() : number {
    return 180 * Number(this) / Math.PI
}

Number.prototype.toRadians = function() : number {
    return Math.PI * Number(this) / 180
}

export { Calculus }