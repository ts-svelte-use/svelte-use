import { pausableFilter } from "../filters/index.js"
import { watch, type WatchOptions } from "../watch/index.svelte.js"

export function watchPausable<T>(
	source: () => T,
	callback: (value: T, oldValue: T | undefined) => void,
	options: Omit<WatchOptions<T>, "eventFilter"> = {}
) {
	return watch(source, callback, {
		...options,
		eventFilter: pausableFilter()
	})
}
