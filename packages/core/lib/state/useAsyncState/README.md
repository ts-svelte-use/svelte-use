# useAsyncState

```ts
// todo.ts
import { useAsyncState } from "$lib/index.js"

interface Todo {
	userId: number
	id: number
	title: string
	completed: boolean
}

export const todoApi = useAsyncState<Todo, [id: number]>(
	(id: number) =>
		fetch(`https://jsonplaceholder.typicode.com/todos/${id}`).then((res) => res.json()),
	{ ssrKey: "todo", transformError: (e: Error) => ({ message: e.message }) }
)
```

```ts
// +page.server.ts
import type { Load } from "@sveltejs/kit"
import { todoApi } from "./apis/todo.js"

export const load: Load = () => todoApi.load(1)
```

```ts
// +page.ts
import type { Load } from "@sveltejs/kit"
import { todoApi } from "./apis/todo.js"

export const load: Load = todoApi.load
```

```svelte
<!-- +page.svelte -->
<script lang="ts">
	import { todoApi } from "./apis/todo.js"
</script>

<div>
	{JSON.stringify(todoApi.data)}
</div>

<div>
	<div>
		isLoading: {String(todoApi.isLoading)}
	</div>
	<br />
	<div>
		error: {JSON.stringify(todoApi.error)}
	</div>
	<br />
	<div>
		data: {todoApi.data ? JSON.stringify(todoApi.data) : "No Data"}
	</div>
</div>

<br />
<button onclick={() => todoApi.execute(1)}>Execute</button>
```
