import { watch, type WatchOptions } from "../watch/index.svelte.js"

export interface WatchWhileOptions<T> extends Omit<WatchOptions<T>, "eventFilter"> {
	whileFn: (value: T, oldValue: T | undefined) => boolean
}

const watchWhile = <T>(
	source: () => T,
	callback: (value: T, oldValue: T | undefined) => void,
	options: WatchWhileOptions<T>
) => {
	return watch<T>(source, callback, { ...options, eventFilter: { filter: options.whileFn } })
}

export { watchWhile }
