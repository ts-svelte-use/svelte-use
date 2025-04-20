import { describe, it, expect } from "vitest"
import { render, waitFor } from "@testing-library/svelte"
import WindowFocusTest from "./cases/WindowFocusTest.svelte"

describe("useWindowFocus", () => {
	it("should track window focus state", async () => {
		const { getByTestId } = render(WindowFocusTest)
		const focusInfo = getByTestId("focus-info")

		// Initial state (window should be focused)
		await waitFor(() => {
			expect(focusInfo.textContent).toBe("Window Focus: Yes")
		})

		// Simulate window blur
		window.dispatchEvent(new Event("blur"))
		await waitFor(() => {
			expect(focusInfo.textContent).toBe("Window Focus: No")
		})

		// Simulate window focus
		window.dispatchEvent(new Event("focus"))
		await waitFor(() => {
			expect(focusInfo.textContent).toBe("Window Focus: Yes")
		})
	})

	it("should handle multiple focus changes", async () => {
		const { getByTestId } = render(WindowFocusTest)
		const focusInfo = getByTestId("focus-info")

		// Multiple focus changes
		window.dispatchEvent(new Event("blur"))
		await waitFor(() => {
			expect(focusInfo.textContent).toBe("Window Focus: No")
		})

		window.dispatchEvent(new Event("focus"))
		await waitFor(() => {
			expect(focusInfo.textContent).toBe("Window Focus: Yes")
		})

		window.dispatchEvent(new Event("blur"))
		await waitFor(() => {
			expect(focusInfo.textContent).toBe("Window Focus: No")
		})
	})
})
