import { onDestroy, onMount } from "svelte"
import { isServer } from "../utils/index.js"

export interface UseStorageStorage {
	getItem(key: string): string | null
	setItem(key: string, value: string): void
	removeItem(key: string): void
}

export interface UseStorageOptions<T> {
	key: string
	defaultValue: T
	storage?: UseStorageStorage
	serializer?: {
		write?(value: T): string
		read?(value: string): T
	}
	onReadFailure?(storedValue: string, error: unknown): T
}

export type StorageOptions<T> = Omit<UseStorageOptions<T>, "key" | "storage">

export interface StorageUpdater<T> {
	setItem(key: string, value: T): void
	removeItem(key: string): void
}

function _createStorage(): UseStorageStorage {
	const storage: { [key: string]: string } = {}

	return {
		getItem: (key: string) => storage[key] ?? null,
		setItem(key: string, value: string) {
			storage[key] = value
		},
		removeItem(key: string) {
			delete storage[key]
		}
	}
}

type Subscriber<T> = (value: T | null) => void
const _useStorage = () => {
	const defaultStorage: UseStorageStorage = isServer() ? _createStorage() : localStorage
	const storageUpdater = new Map<UseStorageStorage, { [key: string]: Subscriber<any>[] }>()

	function subscribe<T>(storage: UseStorageStorage, key: string, fn: Subscriber<T>) {
		if (!storageUpdater.has(storage)) {
			storageUpdater.set(storage, {})
		}

		const subscribers = storageUpdater.get(storage)!
		subscribers[key] = subscribers[key] || []
		subscribers[key].push(fn)

		return () => {
			subscribers[key] = subscribers[key].filter((_fn) => _fn !== fn)
		}
	}

	function notify(storage: UseStorageStorage, key: string, value: any, notifier: Subscriber<any>) {
		const subscribers = storageUpdater.get(storage)
		if (subscribers) {
			subscribers[key].forEach((sub) => {
				if (sub !== notifier) {
					sub(value)
				}
			})
		}
	}

	return <T>(options: UseStorageOptions<T>) => {
		const storage = options.storage ?? defaultStorage
		const writeSerializer = options.serializer?.write ?? JSON.stringify
		const readSerializer = options.serializer?.read ?? JSON.parse

		let value = $state<T>(options.defaultValue)

		onMount(() => {
			const storedValue = storage.getItem(options.key)
			if (storedValue) {
				try {
					value = readSerializer(storedValue)
				} catch (error) {
					if (options.onReadFailure) {
						value = options.onReadFailure(storedValue, error)
					}
				}
			}
		})

		const deleteValue = (notified = false) => {
			storage.removeItem(options.key)
			value = options.defaultValue

			if (!notified) {
				notify(storage, options.key, null, notifier)
			}
		}

		const setValue = (newValue: T, notified = false) => {
			storage.setItem(options.key, writeSerializer(newValue))
			value = newValue

			if (!notified) {
				notify(storage, options.key, newValue, notifier)
			}
		}

		function notifier(newValue: T | null) {
			if (newValue === null) {
				deleteValue(true)
			} else {
				setValue(newValue, true)
			}
		}

		const unsubscribe = subscribe<T>(storage, options.key, notifier)
		onDestroy(unsubscribe)

		return {
			get value() {
				return value
			},
			set value(newValue: T) {
				setValue(newValue)
			},
			delete: () => deleteValue()
		}
	}
}

const useStorage = _useStorage()
export { useStorage }
