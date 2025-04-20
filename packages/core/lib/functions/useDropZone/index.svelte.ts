import { isBrowser } from "../../internals/index.js"

interface DropZoneOptions {
	onDrop?: (files: FileList) => void
	onDragEnter?: (event: DragEvent) => void
	onDragLeave?: (event: DragEvent) => void
	onDragOver?: (event: DragEvent) => void
}

const useDropZone = (element: HTMLElement, options: DropZoneOptions = {}) => {
	if (!isBrowser()) {
		return {
			get value() {
				return false
			}
		}
	}

	let isOver = $state(false)

	const handleDragEnter = (event: DragEvent) => {
		event.preventDefault()
		isOver = true
		options.onDragEnter?.(event)
	}

	const handleDragLeave = (event: DragEvent) => {
		event.preventDefault()
		isOver = false
		options.onDragLeave?.(event)
	}

	const handleDragOver = (event: DragEvent) => {
		event.preventDefault()
		options.onDragOver?.(event)
	}

	const handleDrop = (event: DragEvent) => {
		event.preventDefault()
		isOver = false
		if (event.dataTransfer?.files) {
			options.onDrop?.(event.dataTransfer.files)
		}
	}

	element.addEventListener("dragenter", handleDragEnter)
	element.addEventListener("dragleave", handleDragLeave)
	element.addEventListener("dragover", handleDragOver)
	element.addEventListener("drop", handleDrop)

	return {
		get value() {
			return isOver
		}
	}
}

export { useDropZone }
