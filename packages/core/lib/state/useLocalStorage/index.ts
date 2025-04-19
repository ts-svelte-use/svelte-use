import { useStorage, type StorageOptions, isBrowser } from "../../internals/index.js"

const useLocalStorage = <T>(key: string, options: StorageOptions<T>) => {
	return useStorage<T>({
		key,
		storage: isBrowser() ? localStorage : undefined,
		...options
	})
}

export { useLocalStorage }
