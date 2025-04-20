<script lang="ts">
	import { useWindowScroll } from "$lib/index.js"

	const ws = useWindowScroll()
</script>

<div data-testid="scroll-info">
	Scroll X: {ws.value.x}, Y: {ws.value.y}
</div>

<div class="spacer" style="height: 2000px;"></div>
