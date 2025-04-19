import { useStorage, type StorageOptions, isBrowser } from "../../internals/index.js"

const useSessionStorage = <T>(key: string, options: StorageOptions<T>) => {
	return useStorage<T>({
		key,
		storage: isBrowser() ? sessionStorage : undefined,
		...options
	})
}

export { useSessionStorage }
