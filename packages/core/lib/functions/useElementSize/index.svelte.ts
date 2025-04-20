import { isBrowser } from "../../internals/index.js"

interface ElementSize {
	width: number
	height: number
}

const useElementSize = (element: () => HTMLElement) => {
	if (!isBrowser()) {
		return {
			get value() {
				return { width: 0, height: 0 }
			}
		}
	}

	let size = $state<ElementSize>({ width: 0, height: 0 })

	const updateSize = (el: HTMLElement) => {
		size = {
			width: el.offsetWidth,
			height: el.offsetHeight
		}
	}

	$effect(() => {
		const el = element()
		if (el) {
			const resizeObserver = new ResizeObserver(() => updateSize(el))
			resizeObserver.observe(el)

			return () => {
				resizeObserver.disconnect()
			}
		}
	})

	return {
		get value() {
			return size
		}
	}
}

export { useElementSize }
