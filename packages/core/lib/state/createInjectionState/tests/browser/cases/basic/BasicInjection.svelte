<script lang="ts" module>
	import { createInjectionState } from "$lib/index.js"

	const [useInjectValue, useValue] = createInjectionState((v?: string) => v, {
		defaultValue: "default"
	})

	export { useValue }
</script>

<script lang="ts">
	import BasicProvider from "./BasicProvider.svelte"

	const { value } = $props<{ value?: string }>()

	useInjectValue(value)
</script>

<div>
	<BasicProvider />
</div>
