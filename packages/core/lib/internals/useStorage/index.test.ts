import { describe, it, expect, vi, beforeEach } from "vitest"
import { useStorage } from "./index.svelte.js"

describe("useStorage", () => {
	let storage = {
		getItem: vi.fn(),
		setItem: vi.fn(),
		removeItem: vi.fn()
	}

	beforeEach(() => {
		vi.clearAllMocks()
		storage = {
			getItem: vi.fn(),
			setItem: vi.fn(),
			removeItem: vi.fn()
		}
	})

	it("should initialize with default value when no value exists in storage", () => {
		const defaultValue = { name: "test" }
		const store = useStorage({
			key: "test-key",
			defaultValue,
			storage
		})

		expect(store.value).toEqual(defaultValue)
		expect(storage.getItem).toHaveBeenCalledWith("test-key")
	})

	it("should retrieve existing value from storage", () => {
		const storedValue = JSON.stringify({ name: "existing" })
		storage.getItem.mockReturnValue(storedValue)

		const store = useStorage({
			key: "test-key",
			defaultValue: { name: "default" },
			storage
		})

		expect(store.value).toEqual({ name: "existing" })
	})

	it("should update storage when value changes", () => {
		const store = useStorage({
			key: "test-key",
			defaultValue: { name: "initial" },
			storage
		})

		store.value = { name: "updated" }

		expect(storage.setItem).toHaveBeenCalledWith("test-key", JSON.stringify({ name: "updated" }))
	})

	it("should handle string values without JSON parsing", () => {
		const storedValue = "simple string"
		storage.getItem.mockReturnValue(storedValue)

		const store = useStorage({
			key: "test-key",
			defaultValue: "default",
			storage,
			serializer: {
				read: (v: string) => v,
				write: (v: string) => v
			}
		})

		expect(store.value).toBe("simple string")
	})

	it("should handle SSR environment", () => {
		const store = useStorage({
			key: "test-key",
			defaultValue: { name: "ssr" },
			storage: undefined
		})

		expect(store.value).toEqual({ name: "ssr" })
		expect(storage.getItem).not.toHaveBeenCalled()
	})

	it("should handle errors during JSON parsing", () => {
		const invalidJson = "invalid-json"
		storage.getItem.mockReturnValue(invalidJson)

		const store = useStorage({
			key: "test-key",
			defaultValue: { name: "default" },
			storage
		})

		expect(store.value).toEqual({ name: "default" })
	})

	it("should respect custom serializer", () => {
		const customSerializer = {
			read: (v: string) => v.split(",").map(Number),
			write: (v: number[]) => v.join(",")
		}

		const store = useStorage({
			key: "test-key",
			defaultValue: [1, 2, 3],
			storage,
			serializer: customSerializer
		})

		store.value = [4, 5, 6]
		expect(storage.setItem).toHaveBeenCalledWith("test-key", "4,5,6")
	})

	it("should handle null values", () => {
		storage.getItem.mockReturnValue(null)

		const store = useStorage({
			key: "test-key",
			defaultValue: null,
			storage
		})

		expect(store.value).toBeNull()
	})

	it("should handle undefined values", () => {
		storage.getItem.mockReturnValue(undefined)

		const store = useStorage({
			key: "test-key",
			defaultValue: undefined,
			storage
		})

		expect(store.value).toBeUndefined()
	})

	it("should synchronize values between multiple instances with the same key", () => {
		// Create two instances with the same key
		const store1 = useStorage({
			key: "sync-key",
			defaultValue: { count: 0 },
			storage
		})

		const store2 = useStorage({
			key: "sync-key",
			defaultValue: { count: 0 },
			storage
		})

		// Verify initial values are synchronized
		expect(store1.value).toEqual({ count: 0 })
		expect(store2.value).toEqual({ count: 0 })

		// Update first store
		store1.value = { count: 42 }

		// Verify both stores are updated
		expect(store1.value).toEqual({ count: 42 })
		expect(store2.value).toEqual({ count: 42 })

		// Update second store
		store2.value = { count: 100 }

		// Verify both stores are updated again
		expect(store1.value).toEqual({ count: 100 })
		expect(store2.value).toEqual({ count: 100 })
	})
})
