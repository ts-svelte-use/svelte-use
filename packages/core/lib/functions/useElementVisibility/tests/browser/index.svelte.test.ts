import { describe, it, expect } from "vitest"
import { render, waitFor } from "@testing-library/svelte"
import ElementVisibilityTest from "./cases/ElementVisibilityTest.svelte"

describe("useElementVisibility", () => {
	it("should track element visibility in viewport", async () => {
		const { getByTestId } = render(ElementVisibilityTest)
		const container = getByTestId("container")
		const visibilityInfo = getByTestId("visibility-info")

		// Initial state (element should be visible)
		await waitFor(() => {
			expect(visibilityInfo.textContent).toBe("Is Visible: Yes")
		})

		// Scroll element out of view
		container.scrollTop = 1000
		await waitFor(() => {
			expect(visibilityInfo.textContent).toBe("Is Visible: No")
		})

		// Scroll element back into view
		container.scrollTop = 0
		await waitFor(() => {
			expect(visibilityInfo.textContent).toBe("Is Visible: Yes")
		})
	})

	it("should handle partial visibility", async () => {
		const { getByTestId } = render(ElementVisibilityTest)
		const container = getByTestId("container")
		const visibilityInfo = getByTestId("visibility-info")

		// Scroll to partially show the element
		container.scrollTop = 500
		await waitFor(() => {
			expect(visibilityInfo.textContent).toBe("Is Visible: Yes")
		})
	})

	it("should update when container size changes", async () => {
		const { getByTestId } = render(ElementVisibilityTest)
		const container = getByTestId("container")
		const visibilityInfo = getByTestId("visibility-info")

		// Make container smaller
		container.style.height = "100px"
		await waitFor(() => {
			expect(visibilityInfo.textContent).toBe("Is Visible: No")
		})

		// Make container larger
		container.style.height = "500px"
		await waitFor(() => {
			expect(visibilityInfo.textContent).toBe("Is Visible: Yes")
		})
	})
})
