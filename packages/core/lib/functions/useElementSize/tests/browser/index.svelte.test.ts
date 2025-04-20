import { describe, it, expect } from "vitest"
import { render, waitFor } from "@testing-library/svelte"
import ElementSizeTest from "./cases/ElementSizeTest.svelte"

describe("useElementSize", () => {
	it("should track initial element size", async () => {
		const { getByTestId } = render(ElementSizeTest)
		const sizeInfo = getByTestId("size-info")

		// Wait for the element to be mounted and measurements to be taken
		await waitFor(() => {
			const text = sizeInfo.textContent
			expect(text).toContain("Width: 200")
			expect(text).toContain("Height: 100")
		})
	})

	it("should update when element size changes", async () => {
		const { getByTestId } = render(ElementSizeTest)
		const sizeBox = getByTestId("size-box")
		const sizeInfo = getByTestId("size-info")

		// Change element size
		sizeBox.style.width = "300px"
		sizeBox.style.height = "150px"

		// Wait for the measurements to update
		await waitFor(() => {
			const text = sizeInfo.textContent
			expect(text).toContain("Width: 300")
			expect(text).toContain("Height: 150")
		})
	})

	it("should update when element content changes", async () => {
		const { getByTestId } = render(ElementSizeTest)
		const sizeBox = getByTestId("size-box")
		const sizeInfo = getByTestId("size-info")

		// Add content that affects size
		const content = document.createElement("div")
		content.style.height = "200px"
		sizeBox.appendChild(content)

		// Wait for the measurements to update
		await waitFor(() => {
			const text = sizeInfo.textContent
			expect(text).toContain("Height: 300") // 100px + 200px content
		})
	})
})
