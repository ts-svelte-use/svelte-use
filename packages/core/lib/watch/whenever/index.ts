import { watchImmediate } from "../watchImmediate/index.js"
import { type WatchOptions } from "../watch/index.svelte.js"

export type WheneverOptions<T> = Omit<WatchOptions<T>, "eventFilter">

const whenever = <T extends boolean>(
	source: () => T,
	callback: (value: T) => void,
	options: WheneverOptions<T> = {}
) => {
	return watchImmediate<T>(
		source,
		(value) => {
			if (value) {
				callback(value)
			}
		},
		options
	)
}

export { whenever }
