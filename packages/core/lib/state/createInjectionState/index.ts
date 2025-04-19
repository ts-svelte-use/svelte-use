import { setContext, getContext } from "svelte"

export interface CreateInjectionStateOptions<V> {
	key?: string | symbol
	defaultValue?: V
}

const createInjectionState = <F extends (...args: any[]) => any>(
	fn: F,
	options?: CreateInjectionStateOptions<ReturnType<F>>
) => {
	const key = options?.key ?? Symbol()

	const inject = ((...args: any[]) => {
		const ctx = fn(...args) ?? options?.defaultValue
		setContext(key, ctx)
		return ctx
	}) as F

	const provide = (): ReturnType<F> | undefined => {
		const ctx = getContext(key) as ReturnType<F>
		return ctx ?? options?.defaultValue
	}

	return [inject, provide] as const
}

export { createInjectionState }
