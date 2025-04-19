<script lang="ts">
	import { useValue1, useValue2 } from "./MultipleInjection.svelte"

	const value1 = useValue1()
	const value2 = useValue2()
</script>

<div>
	<div data-testid="value1">{value1}</div>
	<div data-testid="value2">{value2}</div>
</div>
