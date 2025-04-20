<script lang="ts">
	import { useResizeObserver } from "$lib/index.js"

	let element: HTMLElement

	const resize = useResizeObserver(() => element)
	let width = $derived(resize.value.width)
	let height = $derived(resize.value.height)
</script>

<div bind:this={element} class="resize-target" data-testid="resize-target">
	<div data-testid="size-info">
		Width: {width}, Height: {height}
	</div>
	<button
		on:click={() => {
			element.style.width = "300px"
			element.style.height = "200px"
		}}
		data-testid="resize-button"
	>
		Resize
	</button>
	<button
		on:click={() => {
			resize.stop()
		}}
		data-testid="stop-observer"
	>
		Stop Observer
	</button>
</div>

<style>
	.resize-target {
		width: 200px;
		height: 100px;
		padding: 20px;
		border: 1px solid #ccc;
		display: flex;
		flex-direction: column;
		gap: 10px;
		transition: all 0.3s ease;
	}
</style>
