<script lang="ts">
	import Input from "$lib/components/ui/input/input.svelte";
	import Label from "$lib/components/ui/label/label.svelte";
	import { get } from "svelte/store";
	import { jsonStore } from "../../stores/jsonStore";
	import type { Bit } from "$lib/types";
	const nodes = get(jsonStore);
	const bits: Bit[] = [];
	for (const n of nodes) {
		if (n.type == "Bit") {
			bits.push(n);
		}
	}
</script>

<div class="w-full h-full flex flex-col justify-center items-center space-y-5">
	<div>
		<Label class="w-full flex font-bold text-3xl p-1">enter group name</Label>
		<Input />
	</div>
	<div>
		{#if bits.length !== 0 }
			<p class="w-full flex font-bold text-xl p-1">add bits to group?</p>
		{/if}
		<div class="overflow-auto flex w-full mx-10">
			{#each bits as bit}
				<div class="border-2 border-grey-300 space-y-1 m-1 p-3">
					<p>{bit.label}</p>
				</div>
			{/each}
		</div>
	</div>
</div>
