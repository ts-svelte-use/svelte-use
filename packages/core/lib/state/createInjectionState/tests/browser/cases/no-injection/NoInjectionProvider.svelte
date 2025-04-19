<script lang="ts">
	import { useValue } from "./NoInjection.svelte"
	const value = useValue()
</script>

<div data-testid="no-injection">{value}</div>
