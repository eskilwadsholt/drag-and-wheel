<script lang="ts">
    import { Calculus } from "../helpers/calculus";


    export let P1, C, P2, r

    $: xAxisRotation = Calculus.angle(P1, C, { x: 1, y: 0 })
    let v1, v2, dx, dy, start
    $: if (C && P1 && P2) {
        v1 = Calculus.vector(C, P1)
        v2 = Calculus.vector(C, P2)
        const f1 = r / Calculus.len(v1)
        const f2 = r / Calculus.len(v2)
        v1 = { x: f1 * v1.x, y: f1 * v1.y }
        v2 = { x: f2 * v2.x, y: f2 * v2.y }
        dx = v2.x - v1.x
        dy = v2.y - v1.y
        start = {
            x: C.x + v1.x,
            y: C.y + v1.y
        }

        if (Calculus.angle(P1, C, P2) > Math.PI) {
            dx = -dx
            dy = -dy
            start = {
                x: C.x + v2.x,
                y: C.y + v2.y
            }
        }
    }

    $: largeArc = Calculus.angle(P1, C, P2) > Math.PI ? 1 : 0

    $: d = `M ${start.x} ${start.y} a ${r} ${r} ${xAxisRotation} 0 0 ${dx} ${dy}`
</script>

<path {d} stroke="#5a5" stroke-width=4 fill=none/>