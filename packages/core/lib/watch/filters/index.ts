import debounce from "lodash-es/debounce.js"
import throttle from "lodash-es/throttle.js"

export interface DebounceFilterOptions {
	/**
	 * The number of milliseconds to delay
	 */
	debounce: number
	/**
	 * The maximum time the function is allowed to be delayed before it's invoked
	 */
	maxWait?: number
}

export const debounceFilter = <T>(options: DebounceFilterOptions) => {
	const { debounce: wait, maxWait } = options

	return {
		filter: debounce(() => true, wait, { maxWait }) as unknown as (
			value: T,
			oldValue: T | undefined
		) => boolean
	}
}

export const pausableFilter = () => {
	let isActive = $state(true)

	return {
		filter: () => isActive,
		returns: {
			get isActive() {
				return isActive
			},
			pause: () => {
				isActive = false
			},
			resume: () => {
				isActive = true
			}
		}
	}
}

export interface ThrottleFilterOptions {
	/**
	 * The number of milliseconds to delay
	 */
	throttle: number
	/**
	 * Whether to invoke the function on the leading edge of the timeout
	 */
	leading?: boolean
	/**
	 * Whether to invoke the function on the trailing edge of the timeout
	 */
	trailing?: boolean
}

export const throttledFilter = <T>(options: ThrottleFilterOptions) => {
	const { throttle: wait, leading = true, trailing = true } = options

	return {
		filter: throttle(() => true, wait, { leading, trailing }) as unknown as (
			value: T,
			oldValue: T | undefined
		) => boolean
	}
}
