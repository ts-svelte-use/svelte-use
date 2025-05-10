<script lang="ts" module>
	import { createInjectionState } from "$lib/index.js"
	const [useInjectInner, useInner] = createInjectionState(() => "inner", { key: "inner" })

	export { useInner }
</script>

<script lang="ts">
	import { useOuter } from "./NestedInjection.svelte"
	import InnerProvider from "./InnerProvider.svelte"

	const outerValue = useOuter()
	useInjectInner()
</script>

<div>
	<div data-testid="outer-value">{outerValue}</div>
	<InnerProvider />
</div>
