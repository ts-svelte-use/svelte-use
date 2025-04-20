import { describe, it, expect } from "vitest"
import { render, waitFor } from "@testing-library/svelte"
import ParentElementTest from "./cases/ParentElementTest.svelte"

describe("useParentElement", () => {
	it("should track parent element", async () => {
		const { getByTestId } = render(ParentElementTest)
		const parentInfo = getByTestId("parent-info")

		// Wait for the element to be mounted
		await waitFor(() => {
			expect(parentInfo.textContent).toBe("Parent Tag: div")
		})
	})

	it("should update when parent changes", async () => {
		const { getByTestId } = render(ParentElementTest)
		const child = getByTestId("child")
		const parentInfo = getByTestId("parent-info")

		// Create a new parent
		const newParent = document.createElement("section")
		newParent.setAttribute("data-testid", "new-parent")
		document.body.appendChild(newParent)

		// Move child to new parent
		newParent.appendChild(child)

		// Wait for the parent to update
		await waitFor(() => {
			expect(parentInfo.textContent).toBe("Parent Tag: section")
		})

		// Clean up
		document.body.removeChild(newParent)
	})

	it("should handle element removal", async () => {
		const { getByTestId } = render(ParentElementTest)
		const child = getByTestId("child")
		const parentInfo = getByTestId("parent-info")

		// Remove the child element
		child.remove()

		// Wait for the parent to update
		await waitFor(() => {
			expect(parentInfo.textContent).toBe("Parent Tag: null")
		})
	})
})
