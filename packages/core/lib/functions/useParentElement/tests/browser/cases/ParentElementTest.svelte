<script lang="ts">
	import { useParentElement } from "$lib/index.js"

	let element: HTMLElement
	const parent = useParentElement(() => element)
</script>

<div class="parent" data-testid="parent">
	<div bind:this={element} class="child" data-testid="child">
		<div data-testid="parent-info">
			Parent Tag: {parent.value.parent?.tagName.toLowerCase() ?? "null"}
		</div>
	</div>
</div>

<style>
	.parent {
		padding: 20px;
		border: 1px solid #ccc;
	}

	.child {
		padding: 10px;
		background: #f0f0f0;
	}
</style>
