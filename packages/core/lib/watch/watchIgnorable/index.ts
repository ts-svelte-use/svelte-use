import { untrack } from "svelte"
import { watch, type WatchOptions } from "../watch/index.svelte"

const watchIgnorable = <T>(
	source: () => T,
	callback: (value: T, oldValue: T | undefined) => void,
	options: WatchOptions<T> = {}
) => {
	const stop = watch<T>(source, callback, options)
	return { stop, ignoreUpdates: untrack }
}
export { watchIgnorable }
