const useArrayFind = <T>(sourceArray: () => T[], predicate: (item: T) => boolean) => {
	let value = $state<T | undefined>(undefined)

	$effect(() => {
		value = sourceArray().find(predicate)
	})

	return {
		get value() {
			return value
		}
	}
}

export { useArrayFind }
