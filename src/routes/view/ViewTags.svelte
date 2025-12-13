<script lang="ts"> import type { Tag } from "$lib/types";
	const tags: Tag[] = Array.from({ length: 20 }, (_, i) => ({
		type: "Tag",
		id: (i + 1).toString(),
		name: `Tag ${i + 1}`,
	}));
</script>

<div class="w-full h-full relative">
	<div class="space-y-3">
		{#each tags as tag}
			<div class="border-2 border-black p-1 space-y-1">
				<p>Type: {tag.type}</p>
				<p>Id: {tag.id}</p>
				<p>Label: {tag.name}</p>
			</div>
		{/each}
	</div>
</div>
