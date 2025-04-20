const useArrayReduce = <T, U>(
	sourceArray: () => T[],
	reducer: (accumulator: U, currentValue: T) => U,
	initialValue: U
) => {
	let value = $state<U>(initialValue)

	$effect(() => {
		value = sourceArray().reduce(reducer, initialValue)
	})

	return {
		get value() {
			return value
		}
	}
}

export { useArrayReduce }
