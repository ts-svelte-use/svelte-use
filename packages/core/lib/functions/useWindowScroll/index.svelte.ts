import { isBrowser } from "../../internals/index.js"

interface WindowScrollState {
	x: number
	y: number
}

const useWindowScroll = () => {
	if (!isBrowser()) {
		return {
			get value() {
				return {
					x: 0,
					y: 0
				}
			}
		}
	}

	let state = $state<WindowScrollState>({
		x: window.scrollX,
		y: window.scrollY
	})

	const updateScroll = () => {
		state = {
			x: window.scrollX,
			y: window.scrollY
		}
	}

	window.addEventListener("scroll", updateScroll)

	return {
		get value() {
			return state
		}
	}
}

export { useWindowScroll }
