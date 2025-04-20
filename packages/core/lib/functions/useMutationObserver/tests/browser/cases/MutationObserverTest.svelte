<script lang="ts">
	import { useMutationObserver } from "$lib/index.js"

	let element: HTMLElement
	let count = 0

	const { stop } = useMutationObserver(
		() => element,
		() => {
			count++
		},
		{
			attributes: true,
			childList: true,
			subtree: true
		}
	)
</script>

<div bind:this={element} class="mutation-target" data-testid="mutation-target">
	<div data-testid="mutation-count">
		Mutations: {count}
	</div>
	<button
		on:click={() => {
			element.style.color = "red"
		}}
		data-testid="change-style"
	>
		Change Style
	</button>
	<button
		on:click={() => {
			// const child = document.createElement("div")
			// child.textContent = "New Child"
			// element.appendChild(child)
		}}
		data-testid="add-child"
	>
		Add Child
	</button>
	<button onclick={stop} data-testid="stop-observer"> Stop Observer </button>
</div>

<style>
	.mutation-target {
		padding: 20px;
		border: 1px solid #ccc;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
