import { untrack } from "svelte"

export interface WatchOptions<T, R = undefined> {
	immediate?: boolean
	atMost?: number
	eventFilter?: { filter: (value: T, oldValue: T | undefined) => boolean; returns?: R }
}

export function watch<T>(
	source: () => T,
	callback: (value: T, oldValue: T | undefined) => void,
	options: WatchOptions<T>
): () => void
export function watch<T, R>(
	source: () => T,
	callback: (value: T, oldValue: T | undefined) => void,
	options: WatchOptions<T, R>
): { stop: () => void } & R
export function watch<T, R = undefined>(
	source: () => T,
	callback: (value: T, oldValue: T | undefined) => void,
	options: WatchOptions<T, R> = {}
) {
	let updated = false
	let oldValue: T | undefined = undefined
	let triggerCount = 0
	let isActive = true

	$effect(() => {
		if (!isActive) return

		const newValue = source()

		if (options.atMost !== undefined && triggerCount >= options.atMost) {
			return
		}

		const shouldTrigger = !options.eventFilter || options.eventFilter.filter(newValue, oldValue)

		if (shouldTrigger && (options.immediate || updated)) {
			callback(newValue, oldValue)
			triggerCount++
		}

		untrack(() => {
			updated = true
			oldValue = newValue
		})
	})

	const stop = () => {
		isActive = false
	}

	if (options.eventFilter && options.eventFilter.returns) {
		return {
			stop,
			...options.eventFilter.returns
		}
	}

	return stop
}
