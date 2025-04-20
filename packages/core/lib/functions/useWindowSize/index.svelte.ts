import { isBrowser } from "../../internals/index.js"

interface WindowSizeState {
	width: number
	height: number
}

const useWindowSize = () => {
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

	let state = $state<WindowSizeState>({
		width: window.innerWidth,
		height: window.innerHeight
	})

	const updateSize = () => {
		state = {
			width: window.innerWidth,
			height: window.innerHeight
		}
	}

	window.addEventListener("resize", updateSize)

	return {
		get value() {
			return state
		}
	}
}

export { useWindowSize }
