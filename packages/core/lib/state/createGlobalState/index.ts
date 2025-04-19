const createGlobalState = <S>(factory: () => S) => {
	let init = false
	let state: S

	return () => {
		if (!init) {
			init = true
			state = factory()
		}
		return state
	}
}

export { createGlobalState }
