export interface UseAsyncStateOptions {
	ssrKey?: string
	transformError?(error: unknown): unknown
}

const useAsyncState = <T = unknown, P extends any[] = []>(
	factory: (...args: P) => Promise<T>,
	options?: UseAsyncStateOptions
) => {
	const transformError = options?.transformError ?? ((e: unknown) => e)
	let isLoading = $state(false)
	let data = $state<T | null>(null)
	let error = $state<unknown>(null)

	const execute = async (...args: P) => {
		isLoading = true

		try {
			data = await factory(...args)
			error = null
			return data
		} catch (err) {
			data = null
			error = transformError(err)
			return null
		} finally {
			isLoading = false
		}
	}

	type Data = { [key: string]: { data: T | null; error: unknown } }
	async function load(...params: [{ data: any }]): Promise<void>
	async function load(...args: P): Promise<Data>
	async function load(...info: any): Promise<any> {
		if (!options?.ssrKey) {
			throw new Error("Please make sure to set ssrKey before use load function")
		}

		const isLoaded =
			info.length === 1 &&
			typeof info[0] === "object" &&
			"data" in info[0] &&
			typeof info[0].data === "object" &&
			options.ssrKey in info[0].data

		if (!isLoaded && typeof window === "undefined") {
			await execute(...info)
			return { [options.ssrKey]: { data, error } }
		}

		const state = info[0].data[options.ssrKey]
		if (state) {
			data = state.data
			error = state.error
		}
	}

	return {
		get isLoading() {
			return isLoading
		},
		get data() {
			return data
		},
		get error() {
			return error
		},
		execute,
		load
	}
}

export { useAsyncState }
