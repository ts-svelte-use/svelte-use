# useLocalStorage

```svelte
<!-- +page.ts -->

<script lang="ts">
	import { useLocalStorage } from "$lib/index.js"

	const theme = useLocalStorage("theme", { defaultValue: "dark" })
	const theme2 = useLocalStorage("theme", { defaultValue: "light" })
</script>

<button onclick={() => (theme.value = theme.value === "dark" ? "light" : "dark")}>
	Toggle theme
</button>
<button onclick={() => theme2.delete()}>delete</button>
<div>{JSON.stringify(theme.value)}</div>
<div>{JSON.stringify(theme2.value)}</div>
```
