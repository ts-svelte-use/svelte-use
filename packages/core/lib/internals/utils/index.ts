export function isServer() {
	return typeof window === "undefined"
}

export function isBrowser() {
	return !isServer()
}
