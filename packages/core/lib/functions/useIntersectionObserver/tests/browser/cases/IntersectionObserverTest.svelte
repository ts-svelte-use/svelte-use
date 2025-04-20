<script lang="ts">
	import { useIntersectionObserver } from "$lib/index.js"

	let element: HTMLElement
	const isIntersecting = useIntersectionObserver(() => element)
</script>

<div class="container" data-testid="container">
	<div class="spacer" style="height: 2000px;"></div>
	<div bind:this={element} class="target" data-testid="target">
		<div data-testid="intersection-info">
			Is Intersecting: {isIntersecting.value ? "Yes" : "No"}
		</div>
	</div>
	<div class="spacer" style="height: 2000px;"></div>
</div>

<style>
	.container {
		height: 500px;
		overflow: auto;
		border: 1px solid #ccc;
	}

	.target {
		width: 200px;
		height: 100px;
		background: #f0f0f0;
		margin: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
