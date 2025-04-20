import { debounce } from "lodash-es"

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
