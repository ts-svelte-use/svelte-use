<script lang="ts" module>
	import { createInjectionState } from "$lib/index.js"

	const [, useValue] = createInjectionState(() => "injected", { defaultValue: "default" })

	export { useValue }
</script>

<script lang="ts">
	import NoInjectionProvider from "./NoInjectionProvider.svelte"
</script>

<div>
	<NoInjectionProvider />
</div>
