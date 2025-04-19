# createInjectionState

```svelte
<!-- counter.svelte.ts -->
import { createInjectionState } from "$lib/index.js"

const [useInjectCounter, useCounter] = createInjectionState((counter: number) => {
	let value = $state(counter)
	const inc = () => value++
	const dec = () => value--
	return {
		get value() {
			return value
		},
		inc,
		dec
	}
})

export { useInjectCounter, useCounter }
```

```svelte
<script lang="ts">
	import { useInjectCounter } from "./components/counter.svelte.js"
	import ShowCounter from "./components/ShowCounter.svelte"

	const counter = useInjectCounter(17)
</script>

<ShowCounter /><!-- 17 -->
<button onclick={counter.inc}>+</button>
<!-- Updating value will update state -->
```

```svelte
<!-- ShowCounter.svelte -->
<script lang="ts">
	import { useCounter } from "./counter.svelte.js"

	const counter = useCounter()!
</script>

<div>
	{counter.value}
</div>
```
