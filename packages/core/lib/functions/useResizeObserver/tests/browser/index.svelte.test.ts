import { describe, it, expect } from "vitest"
import { render, waitFor, fireEvent } from "@testing-library/svelte"
import ResizeObserverTest from "./cases/ResizeObserverTest.svelte"

describe("useResizeObserver", () => {
	it("should track initial element size", async () => {
		const { getByTestId } = render(ResizeObserverTest)
		const sizeInfo = getByTestId("size-info")

		// Wait for the element to be mounted and measurements to be taken
		await waitFor(() => {
			const text = sizeInfo.textContent
			expect(text).toContain("Width: 200")
			expect(text).toContain("Height: 100")
		})
	})

	it("should track size changes", async () => {
		const { getByTestId } = render(ResizeObserverTest)
		const sizeInfo = getByTestId("size-info")
		const resizeButton = getByTestId("resize-button")

		// Trigger resize
		await fireEvent.click(resizeButton)
		await waitFor(() => {
			const text = sizeInfo.textContent
			expect(text).toContain("Width: 300")
			expect(text).toContain("Height: 200")
		})
	})

	it("should stop observing when stop is called", async () => {
		const { getByTestId } = render(ResizeObserverTest)
		const sizeInfo = getByTestId("size-info")
		const resizeButton = getByTestId("resize-button")
		const stopObserverButton = getByTestId("stop-observer")

		// Initial resize
		await fireEvent.click(resizeButton)
		await waitFor(() => {
			const text = sizeInfo.textContent
			expect(text).toContain("Width: 300")
			expect(text).toContain("Height: 200")
		})

		// Stop observer
		await fireEvent.click(stopObserverButton)

		// Try to trigger another resize
		await fireEvent.click(resizeButton)
		await waitFor(() => {
			const text = sizeInfo.textContent
			expect(text).toContain("Width: 300")
			expect(text).toContain("Height: 200")
		})
	})
})
