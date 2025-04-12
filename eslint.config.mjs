import prettier from "eslint-config-prettier"
import js from "@eslint/js"
import { includeIgnoreFile } from "@eslint/compat"
import svelte from "eslint-plugin-svelte"
import globals from "globals"
import { fileURLToPath } from "node:url"
import ts from "typescript-eslint"
import { config as svelteConfig } from "./svelte.config.mjs"

const gitignorePath = fileURLToPath(new URL("./.gitignore", import.meta.url))

export default ts.config(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs.recommended,
	prettier,
	...svelte.configs.prettier,
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node }
		},
		rules: { "no-undef": "off" }
	},
	{
		files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
		ignores: ["eslint.config.mjs", "svelte.config.mjs"],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: [".svelte"],
				parser: ts.parser,
				svelteConfig
			}
		}
	}
)
