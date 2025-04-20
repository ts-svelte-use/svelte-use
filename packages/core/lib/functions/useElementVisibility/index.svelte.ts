import { isBrowser } from "../../internals/index.js"

interface ElementVisibilityOptions {
	threshold?: number
	root?: Element | null
	rootMargin?: string
}

const useElementVisibility = (
	element: () => HTMLElement,
	options: ElementVisibilityOptions = {}
) => {
	if (!isBrowser()) {
		return {
			get value() {
				return false
			}
		}
	}

	let isVisible = $state(false)

	const observer = new IntersectionObserver(
		(entries) => {
			isVisible = entries[0].isIntersecting
		},
		{
			threshold: options.threshold ?? 0,
			root: options.root ?? null,
			rootMargin: options.rootMargin ?? "0px"
		}
	)

	$effect(() => {
		const el = element()
		if (el) {
			observer.observe(el)

			return () => {
				observer.unobserve(el)
			}
		}
	})

	return {
		get value() {
			return isVisible
		}
	}
}

export { useElementVisibility }
