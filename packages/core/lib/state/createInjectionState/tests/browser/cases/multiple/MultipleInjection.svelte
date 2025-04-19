<script lang="ts" module>
	import { createInjectionState } from "$lib/index.js"

	const [useInjectValue1, useValue1] = createInjectionState(() => "value1", { key: "value1" })

	const [useInjectValue2, useValue2] = createInjectionState(() => "value2", { key: "value2" })

	export { useValue1, useValue2 }
</script>

<script lang="ts">
	import MultipleProvider from "./MultipleProvider.svelte"

	useInjectValue1()
	useInjectValue2()
</script>

<div>
	<MultipleProvider />
</div>
