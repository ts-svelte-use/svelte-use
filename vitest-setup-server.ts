import "@testing-library/jest-dom/vitest"
import { vi } from "vitest"

// add more mocks here if you need them
vi.mock("svelte", async () => {
	const actual = await vi.importActual("svelte")
	return {
		...actual,
		onDestroy: vi.fn(),
		onMount: vi.fn((fn: () => void) => fn())
	}
})
