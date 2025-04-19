import { watch, type WatchOptions } from "../watch/index.svelte.js"
import { debounceFilter, type DebounceFilterOptions } from "../filters/index.js"

export interface WatchDebouncedOptions<T>
	extends Omit<WatchOptions<T>, "eventFilter">,
		DebounceFilterOptions {}

const watchDebounced = <T>(
	source: () => T,
	callback: (value: T, oldValue: T | undefined) => void,
	options: WatchDebouncedOptions<T>
) => {
	const { debounce: wait, maxWait, ...watchOptions } = options

	return watch(source, callback, {
		...watchOptions,
		eventFilter: debounceFilter({ debounce: wait, maxWait })
	})
}

export { watchDebounced }
