import { isBrowser } from "../../internals/index.js"

interface MouseInElementOptions {
	handleOutside?: boolean
}

interface MouseInElementState {
	x: number
	y: number
	elementX: number
	elementY: number
	elementPositionX: number
	elementPositionY: number
	elementWidth: number
	elementHeight: number
	isOutside: boolean
}

const useMouseInElement = (element: () => HTMLElement, options: MouseInElementOptions = {}) => {
	if (!isBrowser()) {
		return {
			get value() {
				return {
					x: 0,
					y: 0,
					elementX: 0,
					elementY: 0,
					elementPositionX: 0,
					elementPositionY: 0,
					elementWidth: 0,
					elementHeight: 0,
					isOutside: true
				}
			}
		}
	}

	let state = $state<MouseInElementState>({
		x: 0,
		y: 0,
		elementX: 0,
		elementY: 0,
		elementPositionX: 0,
		elementPositionY: 0,
		elementWidth: 0,
		elementHeight: 0,
		isOutside: true
	})

	const updateState = (event: MouseEvent) => {
		const rect = element().getBoundingClientRect()
		const x = event.clientX
		const y = event.clientY
		const elementX = x - rect.left
		const elementY = y - rect.top
		const elementPositionX = elementX / rect.width
		const elementPositionY = elementY / rect.height
		const isOutside = x < rect.left || x > rect.right || y < rect.top || y > rect.bottom

		state = {
			x,
			y,
			elementX,
			elementY,
			elementPositionX,
			elementPositionY,
			elementWidth: rect.width,
			elementHeight: rect.height,
			isOutside: options.handleOutside ? isOutside : false
		}
	}

	$effect(() => {
		const el = element()
		if (el) {
			document.addEventListener("mousemove", updateState)

			return () => {
				document.removeEventListener("mousemove", updateState)
			}
		}
	})

	return {
		get value() {
			return state
		}
	}
}

export { useMouseInElement }
