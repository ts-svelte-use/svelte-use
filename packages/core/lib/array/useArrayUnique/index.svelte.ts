import uniq from "lodash-es/uniq.js"

const useArrayUnique = <T>(sourceArray: () => T[]) => {
	let value = $state<T[]>([])

	$effect(() => {
		value = uniq(sourceArray())
	})

	return {
		get value() {
			return value
		}
	}
}

export { useArrayUnique }
