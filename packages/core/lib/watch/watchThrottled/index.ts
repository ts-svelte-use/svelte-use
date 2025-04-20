import { watch, type WatchOptions } from "../watch/index.svelte.js"
import { throttledFilter, type ThrottleFilterOptions } from "../filters/index.js"

export interface WatchThrottledOptions<T>
	extends Omit<WatchOptions<T>, "eventFilter">,
		ThrottleFilterOptions {}

const watchThrottled = <T>(
	source: () => T,
	callback: (value: T, oldValue: T | undefined) => void,
	options: WatchThrottledOptions<T>
) => {
	const { throttle: wait, leading, trailing, ...watchOptions } = options

	return watch<T>(source, callback, {
		...watchOptions,
		eventFilter: throttledFilter({ throttle: wait, leading, trailing })
	})
}

export { watchThrottled }
