import { isBrowser } from "../../internals/index.js"

interface MutationObserverOptions {
	attributes?: boolean
	attributeFilter?: string[]
	attributeOldValue?: boolean
	characterData?: boolean
	characterDataOldValue?: boolean
	childList?: boolean
	subtree?: boolean
}

interface MutationObserverState {
	records: MutationRecord[]
}

const useMutationObserver = (
	element: () => HTMLElement,
	callback: (mutations: MutationRecord[]) => void,
	options: MutationObserverOptions = {
		attributes: true,
		childList: true,
		subtree: true
	}
) => {
	if (!isBrowser()) {
		return {
			get value() {
				return {
					records: []
				}
			},
			stop() {}
		}
	}

	let state = $state<MutationObserverState>({
		records: []
	})

	const observer = new MutationObserver((mutations) => {
		state = {
			records: mutations
		}
		callback(mutations)
	})

	$effect(() => {
		const el = element()
		if (el) {
			observer.observe(el, options)

			return () => {
				observer.disconnect()
			}
		}
	})

	return {
		get value() {
			return state
		},
		stop() {
			observer.disconnect()
		}
	}
}

export { useMutationObserver }
