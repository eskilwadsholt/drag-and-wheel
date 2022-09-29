<script lang="ts">
    import { currentGesture } from "../stores/drag-tracking"
    export let size

    $: gesture = currentGesture
    let rotation = 0

    let P, r, R, n
    $: if (size) {
        P = size.P
        r = size.r
        R = size.R
        n = size.n
    }

    $: if ($gesture && P) {
        rotation = $gesture.angleFrom(P)
    }

    let angles
    $: if (n && P) {
        angles = []
        const da = 360 / n

        for (let i = 0; i < n; i++) {
            angles.push((i * da).toRadians())
        }
    }

    const spoke = (angle: number) => {
        const x = P.x + R * Math.cos(angle)
        const y = P.y + R * Math.sin(angle)

        return { x, y }
    }
</script>

<circle cx={P.x} cy={P.y} r={R} fill="#CCC"/>/>
{#each angles as angle}
    <line x1={P.x} y1={P.y} x2={spoke(angle - rotation).x} y2={spoke(angle - rotation).y} stroke="#000" stroke-width="3"/>
{/each}
<circle cx={P.x} cy={P.y} {r} fill="#555"/>/>
<text text-anchor="middle" x={P.x} y={P.y - R - 5}>{rotation.toDegrees().toFixed(0) + "°"}</text>