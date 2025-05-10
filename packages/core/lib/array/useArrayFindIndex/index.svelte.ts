const useArrayFindIndex = <T>(sourceArray: () => T[], predicate: (item: T) => boolean) => {
	let value = $state<number>(-1)

	$effect(() => {
		value = sourceArray().findIndex(predicate)
	})

	return {
		get value() {
			return value
		}
	}
}

export { useArrayFindIndex }
