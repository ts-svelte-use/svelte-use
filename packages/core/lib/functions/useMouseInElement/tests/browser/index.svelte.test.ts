import { describe, it, expect } from "vitest"
import { render, waitFor, fireEvent } from "@testing-library/svelte"
import MouseInElementTest from "./cases/MouseInElementTest.svelte"

describe("useMouseInElement", () => {
	it("should track mouse position inside element", async () => {
		const { getByTestId } = render(MouseInElementTest)
		const mouseArea = getByTestId("mouse-area")
		const positionDisplay = getByTestId("mouse-position")
		const stateDisplay = getByTestId("mouse-state")

		// Initial state
		expect(positionDisplay.textContent).toBe("X: 0, Y: 0")
		expect(stateDisplay.textContent).toBe("Is Inside: No")

		// Simulate mouse enter
		await fireEvent.mouseEnter(mouseArea, { clientX: 100, clientY: 100 })
		await waitFor(() => {
			expect(stateDisplay.textContent).toBe("Is Inside: Yes")
		})

		// Simulate mouse move
		await fireEvent.mouseMove(mouseArea, { clientX: 150, clientY: 150 })
		await waitFor(() => {
			expect(positionDisplay.textContent).toBe("X: 150, Y: 150")
		})

		// Simulate mouse leave
		await fireEvent.mouseLeave(mouseArea)
		await waitFor(() => {
			expect(stateDisplay.textContent).toBe("Is Inside: No")
		})
	})

	it("should handle multiple mouse movements", async () => {
		const { getByTestId } = render(MouseInElementTest)
		const mouseArea = getByTestId("mouse-area")
		const positionDisplay = getByTestId("mouse-position")

		// Multiple mouse movements
		await fireEvent.mouseMove(mouseArea, { clientX: 50, clientY: 50 })
		await waitFor(() => {
			expect(positionDisplay.textContent).toBe("X: 50, Y: 50")
		})

		await fireEvent.mouseMove(mouseArea, { clientX: 200, clientY: 100 })
		await waitFor(() => {
			expect(positionDisplay.textContent).toBe("X: 200, Y: 100")
		})

		await fireEvent.mouseMove(mouseArea, { clientX: 150, clientY: 150 })
		await waitFor(() => {
			expect(positionDisplay.textContent).toBe("X: 150, Y: 150")
		})
	})
})
