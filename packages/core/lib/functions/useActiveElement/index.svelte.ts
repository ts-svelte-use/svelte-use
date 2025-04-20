import { isBrowser } from "../../internals/index.js"

const useActiveElement = () => {
	if (!isBrowser()) {
		return {
			get value() {
				return null
			}
		}
	}

	let activeElement = $state<Element | null>(document.activeElement)

	const updateActiveElement = () => {
		activeElement = document.activeElement
	}

	document.addEventListener("focusin", updateActiveElement)
	document.addEventListener("focusout", updateActiveElement)

	return {
		get value() {
			return activeElement
		}
	}
}

export { useActiveElement }
