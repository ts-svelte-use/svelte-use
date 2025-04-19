import { watch, type WatchOptions } from "../watch/index.svelte"
import { difference } from "lodash-es"

export interface WatchArrayResult<T> {
	value: T[]
	oldValue: T[] | undefined
	added: T[]
	removed: T[]
}

export const watchArray = <T extends any[]>(
	source: () => T,
	callback: (newList: T, oldList: T, added: T[], removed: T[]) => void,
	options: WatchOptions<T> = {}
) => {
	return watch(
		source,
		(value, oldValue) => {
			const _oldValue = oldValue ?? ([] as unknown as T)
			const added = difference(value, _oldValue)
			const removed = difference(_oldValue, value)

			callback(value, _oldValue, added, removed)
		},
		options
	)
}
