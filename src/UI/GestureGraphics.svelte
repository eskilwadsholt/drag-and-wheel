<script lang="ts">
    import { currentGesture } from "../stores/drag-tracking"
    import Arc from "./Arc.svelte";
    import Wheel from "./Wheel.svelte";

    $: gesture = $currentGesture

    const scale = 0.2
    const r = 20
    const Pwheel1 = {
        x: 150,
        y: 200
    }
    const Pwheel2 = {
        x: 100,
        y: 400
    }
    const Pwheel3 = {
        x: 300,
        y: 500
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


<svg>
    <defs>
        <marker id="arrowhead" markerWidth="4" markerHeight="3" 
        refX="0" refY="1.5" orient="auto">
            <polygon points="0 0, 4 1.5, 0 3" />
        </marker>
    </defs>
    <Wheel size={{ P: Pwheel1, r, R: 5 * r, n: 16}}/>
    <Wheel size={{ P: Pwheel2, r: 0.5 * r, R: 2 * r, n: 8}}/>
    <Wheel size={{ P: Pwheel3, r: 0.7 * r, R: 3 * r, n: 8}}/>
    {#if gesture}
        <Arc P1={gesture.start.P} C={Pwheel1} P2={gesture.P} r={2 * r}/>
        <Arc P1={gesture.start.P} C={Pwheel2} P2={gesture.P} r={1 * r}/>
        <Arc P1={gesture.start.P} C={Pwheel3} P2={gesture.P} r={1.3 * r}/>
        <line x1={Pwheel1.x} y1={Pwheel1.y} x2={startP.x} y2={startP.y} stroke="#99f" stroke-width=2/>
        <line x1={Pwheel2.x} y1={Pwheel2.y} x2={startP.x} y2={startP.y} stroke="#99f" stroke-width=2/>
        <line x1={Pwheel3.x} y1={Pwheel3.y} x2={startP.x} y2={startP.y} stroke="#99f" stroke-width=2/>
        <line x1={Pwheel1.x} y1={Pwheel1.y} x2={P.x} y2={P.y} stroke="#f99" stroke-width=2/>
        <line x1={Pwheel2.x} y1={Pwheel2.y} x2={P.x} y2={P.y} stroke="#f99" stroke-width=2/>
        <line x1={Pwheel3.x} y1={Pwheel3.y} x2={P.x} y2={P.y} stroke="#f99" stroke-width=2/>
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
    {/if}
</svg>

<style>
    svg {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
</style>