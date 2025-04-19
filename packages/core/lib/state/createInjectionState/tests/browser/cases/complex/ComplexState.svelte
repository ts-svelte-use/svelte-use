<script lang="ts" module>
	import { createInjectionState } from "$lib/index.js"
	const [useInjectState, useState] = createInjectionState(() => {
		let count = $state(0)
		let name = $state("initial")

		return {
			get count() {
				return count
			},
			get name() {
				return name
			},
			increment() {
				count++
			},
			updateName() {
				name = "updated"
			}
		}
	})

	export { useState }
</script>

<script lang="ts">
	import ComplexProvider from "./ComplexProvider.svelte"

	useInjectState()
</script>

<div>
	<ComplexProvider />
</div>
