import { describe, it, expect } from "vitest"
import { createGlobalState } from "./index.js"

describe("Test createGlobalState", () => {
	it("Should return same state instance", () => {
		const useCounter = createGlobalState(() => ({ value: 0 }))

		const counter1 = useCounter()
		const counter2 = useCounter()

		expect(counter1).toEqual(counter2)
	})
})
