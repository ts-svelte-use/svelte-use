import { watch, type WatchOptions } from "../watch/index.svelte"

const watchOnce = <T>(
	source: () => T,
	callback: (value: T) => void,
	options: Omit<WatchOptions<T>, "atMost"> = {}
) => {
	return watch(
		source,
		(value) => {
			callback(value)
			return true
		},
		{
			atMost: 1,
			...options
		}
	)
}

export { watchOnce }
