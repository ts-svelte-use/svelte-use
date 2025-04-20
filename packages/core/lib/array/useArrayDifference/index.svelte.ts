import difference from "lodash-es/difference.js"

const useArrayDifference = <T>(sourceArray1: () => T[], sourceArray2: () => T[]) => {
	let value = $state<T[]>([])

	$effect(() => {
		value = difference(sourceArray1(), sourceArray2())
	})

	return {
		get value() {
			return value
		}
	}
}

export { useArrayDifference }
