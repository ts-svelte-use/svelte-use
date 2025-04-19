# createGlobalState

```svelte
<script lang="ts">
	import { createGlobalState } from "@ts-svelte-use/core"

	const useCounter = createGlobalState(() => {
		let counter = $state(0)
		const inc = () => counter++
		const dec = () => counter--

		return {
			get value() {
				return counter
			},
			inc,
			dec
		}
	})

	const counter = useCounter()
	const counter2 = useCounter()
</script>

<div>{counter.value}</div>
<div>{counter2.value}</div>

<button onclick={counter.inc}>+</button>
<button onclick={counter2.dec}>-</button>
```
