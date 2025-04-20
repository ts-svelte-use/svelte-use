import { isBrowser } from "../../internals/index.js"

const useDocumentVisibility = () => {
	if (!isBrowser()) {
		return {
			get value() {
				return "visible"
			}
		}
	}

	let visibility = $state<DocumentVisibilityState>(document.visibilityState)

	const updateVisibility = () => {
		visibility = document.visibilityState
	}

	document.addEventListener("visibilitychange", updateVisibility)

	return {
		get value() {
			return visibility
		}
	}
}

export { useDocumentVisibility }
