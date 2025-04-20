<script lang="ts">
	import { useWindowSize } from "$lib/index.js"

	const size = useWindowSize()
</script>

<div data-testid="size-info">
	Window Size: {size.value.width}x{size.value.height}
</div>
