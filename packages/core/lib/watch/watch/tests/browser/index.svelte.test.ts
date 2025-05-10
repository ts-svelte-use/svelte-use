import { describe, it, expect } from "vitest"
import { render, waitFor, fireEvent } from "@testing-library/svelte"
import WatchTest from "./cases/WatchTest.svelte"

describe("watch", () => {
	it("should track changes to the source", async () => {
		const { getByTestId, getByText } = render(WatchTest)
		const count = getByTestId("count")
		const watched = getByTestId("watched")
		const old = getByTestId("old")
		const triggers = getByTestId("triggers")
		const incrementButton = getByText("Increment")

		// Initial state
		expect(count.textContent).toBe("Count: 0")
		expect(watched.textContent).toBe("Watched: 0")
		expect(old.textContent).toBe("Old: ")
		expect(triggers.textContent).toBe("Triggers: 1") // immediate: true triggers once

		// First increment
		incrementButton.click()
		await waitFor(() => {
			expect(count.textContent).toBe("Count: 1")
			expect(watched.textContent).toBe("Watched: 1")
			expect(old.textContent).toBe("Old: 0")
			expect(triggers.textContent).toBe("Triggers: 2")
		})

		// Second increment
		incrementButton.click()
		await waitFor(() => {
			expect(count.textContent).toBe("Count: 2")
			expect(watched.textContent).toBe("Watched: 2")
			expect(old.textContent).toBe("Old: 1")
			expect(triggers.textContent).toBe("Triggers: 3")
		})
	})

	it("should respect atMost option", async () => {
		const { getByTestId, getByText } = render(WatchTest)
		const incrementButton = getByText("Increment")
		const triggers = getByTestId("triggerAtMost")

		// Initial state (1 trigger from immediate)
		expect(triggers.textContent).toBe("Trigger At Most: 1")

		for (let i = 0; i < 5; i++) {
			await fireEvent.click(incrementButton)
		}

		await waitFor(() => {
			expect(triggers.textContent).toBe("Trigger At Most: 3")
		})
	})

	it("should respect eventFilter option", async () => {
		const { getByTestId, getByText } = render(WatchTest)
		const incrementButton = getByText("Increment")
		const watched = getByTestId("filterWatched")

		// Initial state
		await waitFor(() => {
			expect(watched.textContent).toBe("Filter Watched: 0")
		})

		// First increment (odd number, should not trigger)
		await fireEvent.click(incrementButton)
		await waitFor(() => {
			expect(watched.textContent).toBe("Filter Watched: 0")
		})

		// Second increment (even number, should trigger)
		await fireEvent.click(incrementButton)
		await waitFor(() => {
			expect(watched.textContent).toBe("Filter Watched: 2")
		})
	})
})
