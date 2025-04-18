import { describe, it, expect, vi, beforeEach } from "vitest"
import { useAsyncState } from "./index.svelte.js"

describe("useAsyncState", () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it("should initialize with default values", () => {
		const asyncState = useAsyncState(async () => "test")

		expect(asyncState.isLoading).toBe(false)
		expect(asyncState.data).toBeNull()
		expect(asyncState.error).toBeNull()
	})

	it("should handle successful async operation", async () => {
		const asyncState = useAsyncState(async () => "success")

		const result = await asyncState.execute()

		expect(result).toBe("success")
		expect(asyncState.isLoading).toBe(false)
		expect(asyncState.data).toBe("success")
		expect(asyncState.error).toBeNull()
	})

	it("should handle failed async operation", async () => {
		const error = new Error("Test error")
		const asyncState = useAsyncState(async () => {
			throw error
		})

		const result = await asyncState.execute()

		expect(result).toBeNull()
		expect(asyncState.isLoading).toBe(false)
		expect(asyncState.data).toBeNull()
		expect(asyncState.error).toBe(error)
	})

	it("should handle custom error transformation", async () => {
		const error = new Error("Original error")
		const transformedError = new Error("Transformed error")
		const asyncState = useAsyncState(
			async () => {
				throw error
			},
			{
				transformError: () => transformedError
			}
		)

		await asyncState.execute()

		expect(asyncState.error).toBe(transformedError)
	})

	it("should handle SSR data loading", async () => {
		const ssrKey = "test-key"
		const ssrData = { test: "data" }
		const asyncState = useAsyncState(async () => ssrData, { ssrKey })

		await asyncState.load({ data: { [ssrKey]: { data: ssrData, error: null } } })

		expect(asyncState.data).toEqual(ssrData)
		expect(asyncState.error).toBeNull()
	})

	it("should handle SSR error loading", async () => {
		const ssrKey = "test-key"
		const ssrError = new Error("SSR error")
		const asyncState = useAsyncState(async () => "test", { ssrKey })

		await asyncState.load({ data: { [ssrKey]: { data: null, error: ssrError } } })

		expect(asyncState.data).toBeNull()
		expect(asyncState.error).toBe(ssrError)
	})

	it("should throw error when loading without ssrKey", async () => {
		const asyncState = useAsyncState(async () => "test")

		await expect(async () => {
			await asyncState.load({ data: {} })
		}).rejects.toThrow("Please make sure to set ssrKey before use load function")
	})

	it("should handle multiple executions", async () => {
		let count = 0
		const asyncState = useAsyncState(async () => {
			count++
			return count
		})

		await asyncState.execute()
		expect(asyncState.data).toBe(1)

		await asyncState.execute()
		expect(asyncState.data).toBe(2)
	})

	it("should handle function with parameters", async () => {
		const asyncState = useAsyncState(async (a: number, b: number) => a + b)

		const result = await asyncState.execute(2, 3)

		expect(result).toBe(5)
		expect(asyncState.data).toBe(5)
	})

	it("should handle complex data types", async () => {
		const complexData = {
			nested: {
				array: [1, 2, 3],
				object: { key: "value" }
			}
		}
		const asyncState = useAsyncState(async () => complexData)

		const result = await asyncState.execute()

		expect(result).toEqual(complexData)
		expect(asyncState.data).toEqual(complexData)
	})

	it("should handle null and undefined values", async () => {
		const asyncState = useAsyncState(async () => null)

		const result = await asyncState.execute()

		expect(result).toBeNull()
		expect(asyncState.data).toBeNull()
	})

	it("should maintain loading state during execution", async () => {
		const asyncState = useAsyncState(async () => {
			await new Promise((resolve) => setTimeout(resolve, 100))
			return "done"
		})

		const execution = asyncState.execute()
		expect(asyncState.isLoading).toBe(true)

		await execution
		expect(asyncState.isLoading).toBe(false)
	})
})
