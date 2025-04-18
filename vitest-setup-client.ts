import "@testing-library/jest-dom/vitest"
import { vi } from "vitest"

// add more mocks here if you need them
vi.mock("svelte", () => ({
	...vi.importActual("svelte"),
	onDestroy: vi.fn(),
	onMount: vi.fn((fn: () => void) => fn())
}))
