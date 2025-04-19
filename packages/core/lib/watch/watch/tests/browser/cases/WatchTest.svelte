<script lang="ts">
	import { watch } from "$lib/index.js"

	let count = 0
	let watchedValue = 0
	let oldValue: number | undefined = undefined
	let triggerCount = 0
	let triggerAtMostCount = 0
	let filterWatchedValue = 0

	// Test immediate option
	watch(
		() => count,
		(value, old) => {
			watchedValue = value
			oldValue = old
			triggerCount++
		},
		{ immediate: true }
	)

	// Test atMost option
	watch(
		() => count,
		() => triggerAtMostCount++,
		{ immediate: true, atMost: 3 }
	)

	// Test eventFilter option
	watch(
		() => count,
		(value) => {
			filterWatchedValue = value
		},
		{
			eventFilter: (value) => value % 2 === 0
		}
	)

	function increment() {
		count++
	}
</script>

<div>
	<button on:click={increment}>Increment</button>
	<div data-testid="count">Count: {count}</div>
	<div data-testid="watched">Watched: {watchedValue}</div>
	<div data-testid="old">Old: {oldValue ?? ""}</div>
	<div data-testid="triggers">Triggers: {triggerCount}</div>
	<div data-testid="triggerAtMost">Trigger At Most: {triggerAtMostCount}</div>
	<div data-testid="filterWatched">Filter Watched: {filterWatchedValue}</div>
</div>
