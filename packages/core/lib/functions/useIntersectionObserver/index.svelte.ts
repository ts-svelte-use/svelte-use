import { isBrowser } from "../../internals/index.js"

interface IntersectionObserverOptions {
	threshold?: number | number[]
	root?: Element | null
	rootMargin?: string
}

interface IntersectionObserverEntry {
	isIntersecting: boolean
	intersectionRatio: number
	boundingClientRect: DOMRectReadOnly
	intersectionRect: DOMRectReadOnly
	rootBounds: DOMRectReadOnly | null
	target: Element
	time: number
}

const useIntersectionObserver = (
	element: HTMLElement,
	options: IntersectionObserverOptions = {}
) => {
	if (!isBrowser()) {
		return {
			get value() {
				return null
			}
		}
	}

	let entry = $state<IntersectionObserverEntry | null>(null)

	const observer = new IntersectionObserver(
		(entries) => {
			entry = entries[0]
		},
		{
			threshold: options.threshold ?? 0,
			root: options.root ?? null,
			rootMargin: options.rootMargin ?? "0px"
		}
	)

	observer.observe(element)

	return {
		get value() {
			return entry
		}
	}
}

export { useIntersectionObserver }
