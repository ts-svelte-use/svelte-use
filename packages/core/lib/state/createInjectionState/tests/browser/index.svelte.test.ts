import { describe, it, expect } from "vitest"
import { render, screen, waitFor } from "@testing-library/svelte"
import BasicInjection from "./cases/basic/BasicInjection.svelte"
import MultipleInjection from "./cases/multiple/MultipleInjection.svelte"
import NestedInjection from "./cases/nested/NestedInjection.svelte"
import NoInjection from "./cases/no-injection/NoInjection.svelte"
import ComplexState from "./cases/complex/ComplexState.svelte"

describe("createInjectionState - Browser Tests", () => {
	it("should handle basic injection with default value", async () => {
		render(BasicInjection)

		// Test default value
		expect(screen.getByTestId("value").textContent).toBe("default")
	})

	it("should handle basic injection with value", async () => {
		render(BasicInjection, { value: "injected" })

		// Test default value
		expect(screen.getByTestId("value").textContent).toBe("injected")
	})

	it("should handle multiple injections with different keys", async () => {
		render(MultipleInjection)

		// Test first injection
		expect(screen.getByTestId("value1").textContent).toBe("value1")

		// Test second injection
		expect(screen.getByTestId("value2").textContent).toBe("value2")
	})

	it("should handle nested injection contexts", async () => {
		render(NestedInjection)

		// Test outer context
		expect(screen.getByTestId("outer-value").textContent).toBe("outer")

		// Test inner context
		expect(screen.getByTestId("inner-value").textContent).toBe("inner")
	})

	it("should handle cases with no injection", async () => {
		render(NoInjection)

		// Should fall back to default value
		expect(screen.getByTestId("no-injection").textContent).toBe("default")
	})

	it("should handle complex state management", async () => {
		render(ComplexState)

		// Test initial state
		expect(screen.getByTestId("count").textContent).toBe("0")
		expect(screen.getByTestId("name").textContent).toBe("initial")

		// Test state updates
		const incrementButton = screen.getByTestId("increment")
		const updateNameButton = screen.getByTestId("update-name")

		incrementButton.click()
		updateNameButton.click()
		await waitFor(() => {
			expect(screen.getByTestId("count").textContent).toBe("1")
			expect(screen.getByTestId("name").textContent).toBe("updated")
		})
	})
})
