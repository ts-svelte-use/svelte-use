<script lang="ts">
	import { useMouseInElement } from "$lib/index.js"

	let element: HTMLElement
	const mouse = useMouseInElement(() => element)
</script>

<div bind:this={element} class="mouse-area" data-testid="mouse-area">
	<div data-testid="mouse-position">
		X: {mouse.value.x}, Y: {mouse.value.y}
	</div>
	<div data-testid="mouse-state">
		Is Inside: {mouse.value.isOutside ? "Yes" : "No"}
	</div>
</div>

<style>
	.mouse-area {
		width: 300px;
		height: 200px;
		border: 1px solid #ccc;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}
</style>
