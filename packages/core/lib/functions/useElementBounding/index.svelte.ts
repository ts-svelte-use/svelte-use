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

const useElementBounding = (element: () => HTMLElement) => {
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

	const updateBounding = (el: HTMLElement) => {
		const rect = el.getBoundingClientRect()
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

	$effect(() => {
		const el = element()
		if (el) {
			const resizeObserver = new ResizeObserver(() => updateBounding(el))
			resizeObserver.observe(el)

			return () => {
				resizeObserver.disconnect()
			}
		}
	})

	return {
		get value() {
			return bounding
		}
	}
}

export { useElementBounding }
