<script lang="ts">
	import { useValue } from "./BasicInjection.svelte"

	const value = useValue()
</script>

<div>
	<div data-testid="value">{value}</div>
</div>
