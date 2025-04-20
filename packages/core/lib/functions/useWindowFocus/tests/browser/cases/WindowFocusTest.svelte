<script lang="ts">
	import { useWindowFocus } from "$lib/index.js"

	const isFocused = useWindowFocus()
</script>

<div data-testid="focus-info">
	Window Focus: {isFocused.value ? "Yes" : "No"}
</div>
