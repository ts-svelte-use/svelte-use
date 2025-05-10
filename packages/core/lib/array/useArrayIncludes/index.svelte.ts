const useArrayIncludes = <T>(sourceArray: () => T[], searchElement: T) => {
	let value = $state<boolean>(false)

	$effect(() => {
		value = sourceArray().includes(searchElement)
	})

	return {
		get value() {
			return value
		}
	}
}

export { useArrayIncludes }
