import { watch, type WatchOptions } from "../watch/index.svelte"

export const watchImmediate = <T>(
	source: () => T,
	callback: (value: T, oldValue: T | undefined) => void,
	options: Omit<WatchOptions<T>, "immediate"> = {}
) => {
	return watch(source, callback, {
		...options,
		immediate: true
	})
}
