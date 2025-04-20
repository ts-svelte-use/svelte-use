import { describe, it, expect } from "vitest"
import { render, waitFor } from "@testing-library/svelte"
import IntersectionObserverTest from "./cases/IntersectionObserverTest.svelte"

describe("useIntersectionObserver", () => {
	it("should track element intersection with viewport", async () => {
		const { getByTestId } = render(IntersectionObserverTest)
		const container = getByTestId("container")
		const intersectionInfo = getByTestId("intersection-info")

		// Initial state (element should be intersecting)
		await waitFor(() => {
			expect(intersectionInfo.textContent).toBe("Is Intersecting: Yes")
		})

		// Scroll element out of view
		container.scrollTop = 1000
		await waitFor(() => {
			expect(intersectionInfo.textContent).toBe("Is Intersecting: No")
		})

		// Scroll element back into view
		container.scrollTop = 0
		await waitFor(() => {
			expect(intersectionInfo.textContent).toBe("Is Intersecting: Yes")
		})
	})

	it("should handle partial intersection", async () => {
		const { getByTestId } = render(IntersectionObserverTest)
		const container = getByTestId("container")
		const intersectionInfo = getByTestId("intersection-info")

		// Scroll to partially show the element
		container.scrollTop = 500
		await waitFor(() => {
			expect(intersectionInfo.textContent).toBe("Is Intersecting: Yes")
		})
	})

	it("should update when container size changes", async () => {
		const { getByTestId } = render(IntersectionObserverTest)
		const container = getByTestId("container")
		const intersectionInfo = getByTestId("intersection-info")

		// Make container smaller
		container.style.height = "100px"
		await waitFor(() => {
			expect(intersectionInfo.textContent).toBe("Is Intersecting: No")
		})

		// Make container larger
		container.style.height = "500px"
		await waitFor(() => {
			expect(intersectionInfo.textContent).toBe("Is Intersecting: Yes")
		})
	})
})
