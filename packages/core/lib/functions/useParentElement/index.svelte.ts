import { isBrowser } from "../../internals/index.js"

interface ParentElementState {
	parent: HTMLElement | null
}

const useParentElement = (element: () => HTMLElement) => {
	if (!isBrowser()) {
		return {
			get value() {
				return {
					parent: null
				}
			}
		}
	}

	let state = $state<ParentElementState>({ parent: null })

	$effect(() => {
		const el = element()
		if (el) {
			const observer = new MutationObserver(() => {
				state = {
					parent: el.parentElement
				}
			})

			observer.observe(el, {
				childList: true,
				subtree: true
			})

			return () => {
				observer.disconnect()
			}
		}
	})

	return {
		get value() {
			return state
		}
	}
}

export { useParentElement }
