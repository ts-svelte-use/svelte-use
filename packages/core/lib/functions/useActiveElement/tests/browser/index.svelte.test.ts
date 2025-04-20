import { describe, it, expect } from "vitest"
import { render, waitFor, fireEvent } from "@testing-library/svelte"
import ActiveElementTest from "./cases/ActiveElementTest.svelte"

describe("useActiveElement", () => {
	it("should track active element changes", async () => {
		const { getByTestId } = render(ActiveElementTest)
		const input = getByTestId("input")
		const button = getByTestId("button")
		const activeElement = getByTestId("active-element")

		// Initial state
		expect(activeElement.textContent).toBe("Active Element: null")

		// Focus input
		await fireEvent.focus(input)
		await waitFor(() => {
			expect(activeElement.textContent).toBe("Active Element: input")
		})

		// Focus button
		await fireEvent.focus(button)
		await waitFor(() => {
			expect(activeElement.textContent).toBe("Active Element: button")
		})

		// Blur document
		await fireEvent.blur(document)
		await waitFor(() => {
			expect(activeElement.textContent).toBe("Active Element: null")
		})
	})

	it("should handle multiple focus changes", async () => {
		const { getByTestId } = render(ActiveElementTest)
		const input = getByTestId("input")
		const button = getByTestId("button")
		const activeElement = getByTestId("active-element")

		// Multiple focus changes
		await fireEvent.focus(input)
		await waitFor(() => {
			expect(activeElement.textContent).toBe("Active Element: input")
		})

		await fireEvent.focus(button)
		await waitFor(() => {
			expect(activeElement.textContent).toBe("Active Element: button")
		})

		await fireEvent.focus(input)
		await waitFor(() => {
			expect(activeElement.textContent).toBe("Active Element: input")
		})
	})
})
