import { untrack } from "svelte"

export interface WatchOptions<T> {
	immediate?: boolean
	atMost?: number
	eventFilter?: (value: T, oldValue: T | undefined) => boolean
}

export const watch = <T>(
	source: () => T,
	callback: (value: T, oldValue: T | undefined) => void,
	options: WatchOptions<T> = {}
) => {
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

		const shouldTrigger = !options.eventFilter || options.eventFilter(newValue, oldValue)

		if (shouldTrigger && (options.immediate || updated)) {
			callback(newValue, oldValue)
			triggerCount++
		}

		untrack(() => {
			updated = true
			oldValue = newValue
		})
	})

	return () => {
		isActive = false
	}
}
