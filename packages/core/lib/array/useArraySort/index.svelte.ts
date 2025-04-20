import sortBy from "lodash-es/sortBy.js"

const useArraySort = <T>(sourceArray: () => T[], iteratee?: (item: T) => any) => {
	let value = $state<T[]>([])

	$effect(() => {
		value = iteratee ? sortBy(sourceArray(), iteratee) : sortBy(sourceArray())
	})

	return {
		get value() {
			return value
		}
	}
}

export { useArraySort }
