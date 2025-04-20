const useArrayMap = <T, U>(sourceArray: () => T[], mapper: (item: T) => U) => {
	let value = $state<U[]>([])

	$effect(() => {
		value = sourceArray().map(mapper)
	})

	return {
		get value() {
			return value
		}
	}
}

export { useArrayMap }
