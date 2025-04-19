const useLastChanged = (source: () => any) => {
	let last = $state(0)

	$effect(() => {
		// trigger on every update
		source()
		last = Date.now()
	})

	return {
		get value() {
			return last
		}
	}
}

export { useLastChanged }
