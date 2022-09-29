<script lang="ts">
    import { currentGesture } from "../stores/drag-tracking"
    import Wheel from "./Wheel.svelte";

    $: gesture = $currentGesture

    const scale = 0.2
    const r = 20
    const P0 = {
        x: 150,
        y: 200
    }

    const computeVelocity = (gesture) => {
        return {
            x: gesture.velocity.x * scale,
            y: gesture.velocity.y * scale,
            unit: " (px per s/10)"
        }
    }

    let startP, P, velocity, P2
    $: if (gesture) {
        startP = gesture.start.P
        P = gesture.P
        velocity = computeVelocity(gesture)
        P2 = {
            x: P.x + velocity.x,
            y: P.y + velocity.y
        }
    }
</script>

{#if gesture}
    <svg>
        <defs>
            <marker id="arrowhead" markerWidth="4" markerHeight="3" 
            refX="0" refY="1.5" orient="auto">
                <polygon points="0 0, 4 1.5, 0 3" />
            </marker>
        </defs>
        <Wheel size={{ P: { x: 150, y: 200 }, r, R: 5 * r, n: 16}}/>
        <Wheel size={{ P: { x: 100, y: 400 }, r: 0.5 * r, R: 2 * r, n: 8}}/>
        <line x1={startP.x} y1={startP.y} x2={P.x} y2={P.y} stroke="#000" stroke-width="3"/>
        <circle cx={startP.x} cy={startP.y} {r} fill="#99f"/>
        <circle cx={P.x} cy={P.y} {r} fill="#f99"/>
        <line
            x1={P.x}
            y1={P.y}
            x2={P2.x}
            y2={P2.y}
            stroke="#000" stroke-width="3"
            marker-end="url(#arrowhead)"
        />
    </svg>
{/if}

<style>
    svg {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
</style>