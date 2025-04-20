import { isBrowser } from "../../internals/index.js"

interface ResizeObserverState {
	width: number
	height: number
}

const useResizeObserver = (element: () => HTMLElement) => {
	if (!isBrowser()) {
		return {
			get value() {
				return {
					width: 0,
					height: 0
				}
			},
			stop() {}
		}
	}

	let state = $state<ResizeObserverState>({
		width: 0,
		height: 0
	})

	const observer = new ResizeObserver((entries) => {
		for (const entry of entries) {
			state = {
				width: entry.contentRect.width,
				height: entry.contentRect.height
			}
		}
	})

	$effect(() => {
		const el = element()
		if (el) {
			observer.observe(el)

			return () => {
				observer.disconnect()
			}
		}
	})

	return {
		get value() {
			return state
		},
		stop() {
			observer.disconnect()
		}
	}
}

export { useResizeObserver }
