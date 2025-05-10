const useArrayFilter = <T>(sourceArray: () => T[], predicate: (item: T) => boolean) => {
	let value = $state<T[]>([])

	$effect(() => {
		value = sourceArray().filter(predicate)
	})

	return {
		get value() {
			return value
		}
	}
}

export { useArrayFilter }
