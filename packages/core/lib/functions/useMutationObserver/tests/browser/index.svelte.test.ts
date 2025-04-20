import { describe, it, expect } from "vitest"
import { render, waitFor, fireEvent } from "@testing-library/svelte"
import MutationObserverTest from "./cases/MutationObserverTest.svelte"

describe("useMutationObserver", () => {
	it("should track attribute changes", async () => {
		const { getByTestId } = render(MutationObserverTest)
		const mutationCount = getByTestId("mutation-count")
		const changeStyleButton = getByTestId("change-style")

		// Initial state
		expect(mutationCount.textContent).toBe("Mutations: 0")

		// Change style (triggers attribute mutation)
		await fireEvent.click(changeStyleButton)
		await waitFor(() => {
			expect(mutationCount.textContent).toBe("Mutations: 1")
		})
	})

	it("should track child list changes", async () => {
		const { getByTestId } = render(MutationObserverTest)
		const mutationCount = getByTestId("mutation-count")
		const addChildButton = getByTestId("add-child")

		// Add child element
		await fireEvent.click(addChildButton)
		await waitFor(() => {
			expect(mutationCount.textContent).toBe("Mutations: 1")
		})

		// Add another child
		await fireEvent.click(addChildButton)
		await waitFor(() => {
			expect(mutationCount.textContent).toBe("Mutations: 2")
		})
	})

	it("should stop observing when stop is called", async () => {
		const { getByTestId } = render(MutationObserverTest)
		const mutationCount = getByTestId("mutation-count")
		const changeStyleButton = getByTestId("change-style")
		const stopObserverButton = getByTestId("stop-observer")

		// Initial mutation
		await fireEvent.click(changeStyleButton)
		await waitFor(() => {
			expect(mutationCount.textContent).toBe("Mutations: 1")
		})

		// Stop observer
		await fireEvent.click(stopObserverButton)

		// Try to trigger another mutation
		await fireEvent.click(changeStyleButton)
		await waitFor(() => {
			expect(mutationCount.textContent).toBe("Mutations: 1")
		})
	})
})
