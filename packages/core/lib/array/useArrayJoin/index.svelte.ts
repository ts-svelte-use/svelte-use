const useArrayJoin = <T>(sourceArray: () => T[], separator: string = ",") => {
	let value = $state<string>("")

	$effect(() => {
		value = sourceArray().join(separator)
	})

	return {
		get value() {
			return value
		}
	}
}

export { useArrayJoin }
