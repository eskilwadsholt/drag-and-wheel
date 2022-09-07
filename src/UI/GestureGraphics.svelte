<script lang="ts">
    import { currentGesture } from "../stores/drag-tracking"

    $: gesture = $currentGesture

    const scale = 0.2

    let style, P, velocity
    $: if (gesture) {
        P = gesture.P
        velocity = gesture.velocity
        style = `left:${P.x - 15}px;top:${P.y - 15}px`
    }
</script>

{#if gesture}
    <main {style}>
        <div class="velocity">
            <svg>
                <defs>
                    <marker id="arrowhead" markerWidth="4" markerHeight="3" 
                    refX="0" refY="1.5" orient="auto">
                      <polygon points="0 0, 4 1.5, 0 3" />
                    </marker>
                  </defs>
                <line
                    x1={P.x}
                    y1={P.y}
                    x2={P.x + scale * velocity.x}
                    y2={P.y + scale * velocity.y}
                    stroke="#000" stroke-width="4"
                    marker-end="url(#arrowhead)"
                />
            </svg>
        </div>
    </main>    
{/if}

<style>
    main {
        position: fixed;
        background: #00f8;
        border-radius: 100%;
        width: 30px;
        height: 30px;
    }
    svg {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
</style>