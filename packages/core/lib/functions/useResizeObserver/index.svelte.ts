import { isBrowser } from "../../internals/index.js"

interface ResizeObserverState {
	width: number
	height: number
}

const useResizeObserver = (element: HTMLElement) => {
	if (!isBrowser()) {
		return {
			get value() {
				return {
					width: 0,
					height: 0
				}
			}
		}
	}

	let state = $state<ResizeObserverState>({
		width: element.offsetWidth,
		height: element.offsetHeight
	})

	const observer = new ResizeObserver((entries) => {
		for (const entry of entries) {
			state = {
				width: entry.contentRect.width,
				height: entry.contentRect.height
			}
		}
	})

	observer.observe(element)

	return {
		get value() {
			return state
		}
	}
}

export { useResizeObserver }
