import { isBrowser } from "../../internals/index.js"

interface DropZoneOptions {
	onDrop?: (files: FileList) => void
	onDragEnter?: (event: DragEvent) => void
	onDragLeave?: (event: DragEvent) => void
	onDragOver?: (event: DragEvent) => void
}

const useDropZone = (element: () => HTMLElement, options: DropZoneOptions = {}) => {
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

	$effect(() => {
		const el = element()
		if (el) {
			el.addEventListener("dragenter", handleDragEnter)
			el.addEventListener("dragleave", handleDragLeave)
			el.addEventListener("dragover", handleDragOver)
			el.addEventListener("drop", handleDrop)

			return () => {
				el.removeEventListener("dragenter", handleDragEnter)
				el.removeEventListener("dragleave", handleDragLeave)
				el.removeEventListener("dragover", handleDragOver)
				el.removeEventListener("drop", handleDrop)
			}
		}
	})

	return {
		get value() {
			return isOver
		}
	}
}

export { useDropZone }
