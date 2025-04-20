<script lang="ts">
	import { useDropZone } from "$lib/index.js"

	let dropZoneElement: HTMLElement
	const dropZone = useDropZone(() => dropZoneElement, {
		onDrop: (files) => {
			console.log("Files dropped:", files)
		}
	})
</script>

<div
	bind:this={dropZoneElement}
	class="drop-zone"
	class:active={dropZone.value}
	data-testid="drop-zone"
>
	{#if dropZone.value}
		<p data-testid="drop-message">Drop files here</p>
	{:else}
		<p data-testid="drag-message">Drag and drop files here</p>
	{/if}
</div>

<style>
	.drop-zone {
		width: 300px;
		height: 200px;
		border: 2px dashed #ccc;
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
	}

	.drop-zone.active {
		border-color: #4caf50;
		background-color: rgba(76, 175, 80, 0.1);
	}
</style>
