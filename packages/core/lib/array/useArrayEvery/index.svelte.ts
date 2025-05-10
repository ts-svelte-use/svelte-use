const useArrayEvery = <T>(sourceArray: () => T[], predicate: (item: T) => boolean) => {
	let value = $state<boolean>(false)

	$effect(() => {
		value = sourceArray().every(predicate)
	})

	return {
		get value() {
			return value
		}
	}
}

export { useArrayEvery }
