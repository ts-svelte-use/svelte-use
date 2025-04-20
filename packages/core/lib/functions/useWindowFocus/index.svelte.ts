import { isBrowser } from "../../internals/index.js"

interface WindowFocusState {
	isFocused: boolean
}

const useWindowFocus = () => {
	if (!isBrowser()) {
		return {
			get value() {
				return {
					isFocused: false
				}
			}
		}
	}

	let state = $state<WindowFocusState>({
		isFocused: document.hasFocus()
	})

	const updateFocus = () => {
		state = {
			isFocused: document.hasFocus()
		}
	}

	window.addEventListener("focus", updateFocus)
	window.addEventListener("blur", updateFocus)

	return {
		get value() {
			return state
		}
	}
}

export { useWindowFocus }
