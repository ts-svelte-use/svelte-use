import { createGlobalState } from "../createGlobalState/index.js"

const createSharedComposable = <F extends (...args: any[]) => any>(fn: F) => {
	return createGlobalState<ReturnType<F>>(fn)
}

export { createSharedComposable }
