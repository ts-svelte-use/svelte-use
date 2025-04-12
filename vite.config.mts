import { svelteTesting } from "@testing-library/svelte/vite"
import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    workspace: [
      {
        extends: "../../vite.config.mts",
        plugins: [svelteTesting()],
        test: {
          name: "client",
          environment: "jsdom",
          clearMocks: true,
          include: ["tests/**/*.svelte.{test,spec}.{js,ts}"],
          exclude: ["lib/server/**"],
          setupFiles: ["../../vitest-setup-client.ts"],
        },
      },
      {
        extends: "../../vite.config.mts",
        test: {
          name: "server",
          environment: "node",
          include: ["tests/**/*.{test,spec}.{js,ts}"],
          exclude: ["**/*.svelte.{test,spec}.{js,ts}"],
        },
      },
    ],
  },
})
