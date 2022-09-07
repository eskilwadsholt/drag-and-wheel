<script lang="ts">
    import type { Point } from "../helpers/calculus";
    import { currentGesture } from "../stores/drag-tracking"

    $: gesture = $currentGesture

    const pointString = (P: Point) => `(${P.x}, ${P.y})`
    const velocityString = (P: Point) => `(${P.x.toFixed(1)}, ${P.y.toFixed(1)})`
</script>

<main>
    <table class="styled-table">
        <thead>
            <tr>
                <th>Field</th>
                <th>Value</th>
            </tr>
        </thead>
        <tbody>
            {#if gesture}    
                <tr>
                    <td>start.P</td>
                    <td>{pointString(gesture.start.P)}</td>
                </tr>
                <tr>
                    <td>P</td>
                    <td>{pointString(gesture.P)}</td>
                </tr>
                <tr>
                    <td>duration</td>
                    <td>{(gesture.duration() / 1000).toFixed(2) + " s"}</td>
                </tr>
                <tr>
                    <td>distance</td>
                    <td>{gesture.distance().toFixed(1)}</td>
                </tr>
                <tr>
                    <td>velocity</td>
                    <td>{velocityString(gesture.velocity)}</td>
                </tr>
            {/if}
        </tbody>
    </table>
</main>

<style>
    main {
        position: fixed;
        left: 10px;
        top: 0;
    }
    .styled-table {
        border-collapse: collapse;
        margin: 25px 0;
        font-size: 0.9em;
        font-family: sans-serif;
        min-width: 400px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    }
    .styled-table thead tr {
        background-color: #009879;
        color: #ffffff;
        text-align: left;
    }
    .styled-table th,
    .styled-table td {
        padding: 2px 3px;
    }
    .styled-table tbody tr {
        border-bottom: 1px solid #dddddd;
    }

    .styled-table tbody tr:nth-of-type(even) {
        background-color: #f3f3f3;
    }

    .styled-table tbody tr:last-of-type {
        border-bottom: 2px solid #009879;
    }
</style>