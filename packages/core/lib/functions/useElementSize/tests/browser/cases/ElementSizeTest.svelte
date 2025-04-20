<script lang="ts">
	import { useElementSize } from "$lib/index.js"

	let element: HTMLElement
	const size = useElementSize(() => element)
</script>

<div bind:this={element} class="size-box" data-testid="size-box">
	<div data-testid="size-info">
		Width: {size.value.width}, Height: {size.value.height}
	</div>
</div>

<style>
	.size-box {
		width: 200px;
		height: 100px;
		border: 1px solid #ccc;
		padding: 20px;
		margin: 30px;
		position: relative;
	}
</style>
