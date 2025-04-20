<script lang="ts">
	import { useActiveElement } from "$lib/index.js"

	const el = useActiveElement()
</script>

<div>
	<input data-testid="input" type="text" />
	<button data-testid="button">Button</button>
	<div data-testid="active-element">
		Active Element: {el.value?.tagName.toLowerCase() ?? "null"}
	</div>
</div>
