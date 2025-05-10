<script lang="ts" module>
	import { createInjectionState } from "$lib/index.js"
	const [useInjectOuter, useOuter] = createInjectionState(() => "outer", { key: "outer" })

	export { useOuter }
</script>

<script lang="ts">
	import NestedProvider from "./NestedProvider.svelte"

	useInjectOuter()
</script>

<div>
	<NestedProvider />
</div>
