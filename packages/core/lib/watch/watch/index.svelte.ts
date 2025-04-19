import { untrack, tick } from "svelte"

export type WatchFlushMode = "pre" | "post" | "sync"

export interface WatchOptions<T> {
	immediate?: boolean
	atMost?: number
	eventFilter?: (value: T, oldValue: T | undefined) => boolean
	flush?: WatchFlushMode
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

	const executeCallback = async (newValue: T) => {
		if (!isActive) return

		const shouldTrigger = !options.eventFilter || options.eventFilter(newValue, oldValue)

		if (shouldTrigger && (options.immediate || updated)) {
			if (options.flush === "post") {
				await tick()
			}
			callback(newValue, oldValue)
			triggerCount++
		}

		untrack(() => {
			updated = true
			oldValue = newValue
		})
	}

	$effect(() => {
		if (!isActive) return

		const newValue = source()

		if (options.atMost !== undefined && triggerCount >= options.atMost) {
			return
		}

		if (options.flush === "pre") {
			executeCallback(newValue)
		} else if (options.flush === "sync") {
			untrack(() => executeCallback(newValue))
		} else {
			// default 'post' behavior
			executeCallback(newValue)
		}
	})

	return () => {
		isActive = false
	}
}
