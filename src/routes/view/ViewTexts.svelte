<script lang="ts">
	import type { Text } from "$lib/types";
	const texts: Text[] = Array.from({ length: 20 }, (_, i) => ({
		type: "Text",
		id: (i + 1).toString(),
		label: `Text ${i + 1}`,
		content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
deserunt mollit anim id est laborum.`,
	}));
</script>

<div class="w-full h-full relative">
	<div class="space-y-3">
		{#each texts as text}
			<div class="border-2 border-black p-1 space-y-1">
				<p>Type: {text.type}</p>
				<p>Id: {text.id}</p>
				<p>Label: {text.label}</p>
				<p>Content: {text.content}</p>
			</div>
		{/each}
	</div>
</div>
