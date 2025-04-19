<script lang="ts">
	import { useState } from "./ComplexState.svelte"
	const state = useState()
</script>

<div>
	<div data-testid="count">{state?.count}</div>
	<div data-testid="name">{state?.name}</div>
	<button data-testid="increment" on:click={() => state?.increment()}>Increment</button>
	<button data-testid="update-name" on:click={() => state?.updateName()}>Update Name</button>
</div>
