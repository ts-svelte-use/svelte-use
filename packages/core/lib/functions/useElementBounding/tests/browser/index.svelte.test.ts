import { describe, it, expect } from "vitest"
import { render, waitFor } from "@testing-library/svelte"
import ElementBoundingTest from "./cases/ElementBoundingTest.svelte"

describe("useElementBounding", () => {
	it("should track element dimensions and position", async () => {
		const { getByTestId } = render(ElementBoundingTest)
		const boundingInfo = getByTestId("bounding-info")

		// Wait for the element to be mounted and measurements to be taken
		await waitFor(() => {
			const text = boundingInfo.textContent
			expect(text).toContain("Width: 200")
			expect(text).toContain("Height: 100")
			expect(text).toContain("Top: 30")
			expect(text).toContain("Left: 30")
		})
	})

	it("should update when element size changes", async () => {
		const { getByTestId } = render(ElementBoundingTest)
		const boundingBox = getByTestId("bounding-box")
		const boundingInfo = getByTestId("bounding-info")

		// Change element size
		boundingBox.style.width = "300px"
		boundingBox.style.height = "150px"

		// Wait for the measurements to update
		await waitFor(() => {
			const text = boundingInfo.textContent
			expect(text).toContain("Width: 300")
			expect(text).toContain("Height: 150")
		})
	})

	it("should update when element position changes", async () => {
		const { getByTestId } = render(ElementBoundingTest)
		const boundingBox = getByTestId("bounding-box")
		const boundingInfo = getByTestId("bounding-info")

		// Change element position
		boundingBox.style.marginTop = "50px"
		boundingBox.style.marginLeft = "50px"

		// Wait for the measurements to update
		await waitFor(() => {
			const text = boundingInfo.textContent
			expect(text).toContain("Top: 50")
			expect(text).toContain("Left: 50")
		})
	})
})
