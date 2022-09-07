<script lang="ts">
	import gestures from "./events/gestures"
	import { currentGesture } from "./stores/drag-tracking"
import GestureGraphics from "./UI/GestureGraphics.svelte"
	import GestureInfo from "./UI/GestureInfo.svelte"

	const handleGesture = (e: CustomEvent) => {
		$currentGesture = e.detail.gesture
	}

	const resetGesture = () => $currentGesture = null
</script>

<main  class="noselect"
	use:gestures
	on:down={handleGesture}
	on:move={handleGesture}
	on:up={resetGesture}
>
	<GestureInfo/>
	<GestureGraphics/>
</main>

<style>
	main {
		position: fixed;
		left: 0;
		top: 0;
		text-align: center;
		padding: 1em;
		margin: 0 auto;
		background: #0006;
		flex: 1;
		width: 100%;
		height: 100%;
	}
</style>