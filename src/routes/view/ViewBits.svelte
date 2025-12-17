<script lang="ts">
	import type { Bit } from "$lib/types";
	const bits: Bit[] = Array.from({ length: 20 }, (_, i) => ({
		type: "Bit",
		id: (i + 1).toString(),
		label: `Bit ${i + 1}`,
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
		{#each bits as bit}
			<div class="border-2 border-black p-1 space-y-1">
				<p>Type: {bit.type}</p>
				<p>Id: {bit.id}</p>
				<p>Label: {bit.label}</p>
				<p>Content: {bit.content}</p>
			</div>
		{/each}
	</div>
</div>
