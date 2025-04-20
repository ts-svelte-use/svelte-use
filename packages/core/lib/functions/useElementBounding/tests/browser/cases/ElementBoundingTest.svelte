<script lang="ts">
	import { useElementBounding } from "$lib/index.js"

	let element: HTMLElement
	const bounding = useElementBounding(() => element)
</script>

<div bind:this={element} class="bounding-box" data-testid="bounding-box">
	<div data-testid="bounding-info">
		Width: {bounding.value.width}, Height: {bounding.value.height}
		<br />
		Top: {bounding.value.top}, Left: {bounding.value.left}
	</div>
</div>

<style>
	.bounding-box {
		width: 200px;
		height: 100px;
		border: 1px solid #ccc;
		padding: 20px;
		margin: 30px;
		position: relative;
	}
</style>
