import { describe, it, expect } from "vitest"
import { render, waitFor } from "@testing-library/svelte"
import WindowScrollTest from "./cases/WindowScrollTest.svelte"

describe("useWindowScroll", () => {
	it("should track window scroll position", async () => {
		const { getByTestId } = render(WindowScrollTest)
		const scrollInfo = getByTestId("scroll-info")

		// Initial state
		await waitFor(() => {
			const text = scrollInfo.textContent
			expect(text).toContain("Scroll X: 0")
			expect(text).toContain("Y: 0")
		})

		// Scroll window
		window.scrollTo(100, 200)
		await waitFor(() => {
			const text = scrollInfo.textContent
			expect(text).toContain("Scroll X: 100")
			expect(text).toContain("Y: 200")
		})

		// Scroll back to top
		window.scrollTo(0, 0)
		await waitFor(() => {
			const text = scrollInfo.textContent
			expect(text).toContain("Scroll X: 0")
			expect(text).toContain("Y: 0")
		})
	})

	it("should handle multiple scroll events", async () => {
		const { getByTestId } = render(WindowScrollTest)
		const scrollInfo = getByTestId("scroll-info")

		// Multiple scroll positions
		window.scrollTo(50, 100)
		await waitFor(() => {
			const text = scrollInfo.textContent
			expect(text).toContain("Scroll X: 50")
			expect(text).toContain("Y: 100")
		})

		window.scrollTo(150, 300)
		await waitFor(() => {
			const text = scrollInfo.textContent
			expect(text).toContain("Scroll X: 150")
			expect(text).toContain("Y: 300")
		})

		window.scrollTo(0, 0)
		await waitFor(() => {
			const text = scrollInfo.textContent
			expect(text).toContain("Scroll X: 0")
			expect(text).toContain("Y: 0")
		})
	})
})
