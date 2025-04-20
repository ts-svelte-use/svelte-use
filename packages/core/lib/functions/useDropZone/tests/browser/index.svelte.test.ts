import { describe, it, expect, vi } from "vitest"
import { render, waitFor, fireEvent } from "@testing-library/svelte"
import DropZoneTest from "./cases/DropZoneTest.svelte"

describe("useDropZone", () => {
	it("should show drag message by default", async () => {
		const { getByTestId } = render(DropZoneTest)
		const dragMessage = getByTestId("drag-message")
		expect(dragMessage.textContent).toBe("Drag and drop files here")
	})

	it("should show drop message when dragging over", async () => {
		const { getByTestId } = render(DropZoneTest)
		const dropZone = getByTestId("drop-zone")

		// Simulate drag enter
		await fireEvent.dragEnter(dropZone)
		await waitFor(() => {
			const dropMessage = getByTestId("drop-message")
			expect(dropMessage.textContent).toBe("Drop files here")
		})

		// Simulate drag leave
		await fireEvent.dragLeave(dropZone)
		await waitFor(() => {
			const dragMessage = getByTestId("drag-message")
			expect(dragMessage.textContent).toBe("Drag and drop files here")
		})
	})

	it("should handle file drops", async () => {
		const consoleSpy = vi.spyOn(console, "log")
		const { getByTestId } = render(DropZoneTest)
		const dropZone = getByTestId("drop-zone")

		// Create a mock file
		const file = new File(["test"], "test.txt", { type: "text/plain" })
		const dataTransfer = new DataTransfer()
		dataTransfer.items.add(file)

		// Simulate drop
		await fireEvent.drop(dropZone, { dataTransfer })
		await waitFor(() => {
			expect(consoleSpy).toHaveBeenCalledWith("Files dropped:", [file])
		})

		consoleSpy.mockRestore()
	})
})
