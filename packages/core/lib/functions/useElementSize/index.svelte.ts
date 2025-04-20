import { isBrowser } from "../../internals/index.js"

interface ElementSize {
	width: number
	height: number
}

const useElementSize = (element: HTMLElement) => {
	if (!isBrowser()) {
		return {
			get value() {
				return { width: 0, height: 0 }
			}
		}
	}

	let size = $state<ElementSize>({ width: 0, height: 0 })

	const updateSize = () => {
		size = {
			width: element.offsetWidth,
			height: element.offsetHeight
		}
	}

	const resizeObserver = new ResizeObserver(updateSize)
	resizeObserver.observe(element)

	return {
		get value() {
			return size
		}
	}
}

export { useElementSize }
