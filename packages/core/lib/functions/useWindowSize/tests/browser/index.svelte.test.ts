import { describe, it, expect } from "vitest"
import { render, waitFor } from "@testing-library/svelte"
import WindowSizeTest from "./cases/WindowSizeTest.svelte"

describe("useWindowSize", () => {
	it("should track window size", async () => {
		const { getByTestId } = render(WindowSizeTest)
		const sizeInfo = getByTestId("size-info")

		// Initial state
		await waitFor(() => {
			const text = sizeInfo.textContent
			expect(text).toContain(`Window Size: ${window.innerWidth}x${window.innerHeight}`)
		})

		// Resize window
		Object.defineProperty(window, "innerWidth", { value: 800 })
		Object.defineProperty(window, "innerHeight", { value: 600 })
		window.dispatchEvent(new Event("resize"))

		await waitFor(() => {
			const text = sizeInfo.textContent
			expect(text).toContain("Window Size: 800x600")
		})
	})

	it("should handle multiple resize events", async () => {
		const { getByTestId } = render(WindowSizeTest)
		const sizeInfo = getByTestId("size-info")

		// Multiple resize events
		Object.defineProperty(window, "innerWidth", { value: 1024 })
		Object.defineProperty(window, "innerHeight", { value: 768 })
		window.dispatchEvent(new Event("resize"))

		await waitFor(() => {
			const text = sizeInfo.textContent
			expect(text).toContain("Window Size: 1024x768")
		})

		Object.defineProperty(window, "innerWidth", { value: 640 })
		Object.defineProperty(window, "innerHeight", { value: 480 })
		window.dispatchEvent(new Event("resize"))

		await waitFor(() => {
			const text = sizeInfo.textContent
			expect(text).toContain("Window Size: 640x480")
		})
	})
})
