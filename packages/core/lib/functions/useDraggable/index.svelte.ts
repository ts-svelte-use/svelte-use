import { isBrowser } from "../../internals/index.js"

interface DraggableOptions {
	initialValue?: { x: number; y: number }
	onStart?: (event: MouseEvent) => void
	onMove?: (event: MouseEvent) => void
	onEnd?: (event: MouseEvent) => void
}

const useDraggable = (element: HTMLElement, options: DraggableOptions = {}) => {
	if (!isBrowser()) {
		return {
			get value() {
				return { x: 0, y: 0 }
			}
		}
	}

	let position = $state(options.initialValue || { x: 0, y: 0 })
	let isDragging = false
	let startX = 0
	let startY = 0

	const handleMouseDown = (event: MouseEvent) => {
		isDragging = true
		startX = event.clientX
		startY = event.clientY
		options.onStart?.(event)
	}

	const handleMouseMove = (event: MouseEvent) => {
		if (!isDragging) return

		const deltaX = event.clientX - startX
		const deltaY = event.clientY - startY

		position = {
			x: position.x + deltaX,
			y: position.y + deltaY
		}

		startX = event.clientX
		startY = event.clientY
		options.onMove?.(event)
	}

	const handleMouseUp = (event: MouseEvent) => {
		isDragging = false
		options.onEnd?.(event)
	}

	element.addEventListener("mousedown", handleMouseDown)
	document.addEventListener("mousemove", handleMouseMove)
	document.addEventListener("mouseup", handleMouseUp)

	return {
		get value() {
			return position
		}
	}
}

export { useDraggable }
