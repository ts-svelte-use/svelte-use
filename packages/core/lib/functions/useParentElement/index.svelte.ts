import { isBrowser } from "../../internals/index.js"

interface ParentElementState {
	parent: HTMLElement | null
}

const useParentElement = (element: HTMLElement) => {
	if (!isBrowser()) {
		return {
			get value() {
				return {
					parent: null
				}
			}
		}
	}

	let state = $state<ParentElementState>({
		parent: element.parentElement
	})

	const observer = new MutationObserver(() => {
		state = {
			parent: element.parentElement
		}
	})

	observer.observe(element, {
		childList: true,
		subtree: true
	})

	return {
		get value() {
			return state
		}
	}
}

export { useParentElement }
