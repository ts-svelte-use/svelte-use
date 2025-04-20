const useArrayFindLast = <T>(sourceArray: () => T[], predicate: (item: T) => boolean) => {
	let value = $state<T | undefined>(undefined)

	$effect(() => {
		value = sourceArray().findLast(predicate)
	})

	return {
		get value() {
			return value
		}
	}
}

export { useArrayFindLast }
