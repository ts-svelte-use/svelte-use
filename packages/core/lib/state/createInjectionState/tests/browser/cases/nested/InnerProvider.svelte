<script lang="ts">
	import { useInner } from "./NestedProvider.svelte"
	const innerValue = useInner()
</script>

<div data-testid="inner-value">{innerValue}</div>
