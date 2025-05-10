#

```svelte
<script lang="ts">
	import { useLastChanged } from "$lib/index.js"

	let name = $state("")
	const lastChange = useLastChanged(() => name)
</script>

{name}
<input bind:value={name} />
{lastChange.value}
```
