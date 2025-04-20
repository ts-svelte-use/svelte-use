import { isBrowser } from "../../internals/index.js"

interface ElementBounding {
	x: number
	y: number
	width: number
	height: number
	top: number
	right: number
	bottom: number
	left: number
}

const useElementBounding = (element: HTMLElement) => {
	if (!isBrowser()) {
		return {
			get value() {
				return {
					x: 0,
					y: 0,
					width: 0,
					height: 0,
					top: 0,
					right: 0,
					bottom: 0,
					left: 0
				}
			}
		}
	}

	let bounding = $state<ElementBounding>({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	})

	const updateBounding = () => {
		const rect = element.getBoundingClientRect()
		bounding = {
			x: rect.x,
			y: rect.y,
			width: rect.width,
			height: rect.height,
			top: rect.top,
			right: rect.right,
			bottom: rect.bottom,
			left: rect.left
		}
	}

	const resizeObserver = new ResizeObserver(updateBounding)
	resizeObserver.observe(element)

	return {
		get value() {
			return bounding
		}
	}
}

export { useElementBounding }
