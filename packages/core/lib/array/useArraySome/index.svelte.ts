const useArraySome = <T>(sourceArray: () => T[], predicate: (item: T) => boolean) => {
	let value = $state<boolean>(false)

	$effect(() => {
		value = sourceArray().some(predicate)
	})

	return {
		get value() {
			return value
		}
	}
}

export { useArraySome }
