<script lang="ts">
	import HeaderLogo from "$lib/header-logo.svelte";
	import { onMount } from "svelte";
	import { on } from "svelte/events";
	import NewGroup from "./NewGroup.svelte";
	import NewTag from "./NewTag.svelte";
	import NewBit from "./NewBit.svelte";
	import { jsonStore } from "../../stores/jsonStore";
	import type { Bit, Group } from "$lib/types";
	import { get } from "svelte/store";
	let addWhat = "";

	// child component variables
	let label = "";
	let content = "";
	let name = "";

	let off: () => void;

	function handle(e: KeyboardEvent) {
		if (e.key == "Enter" && e.ctrlKey) {
			console.log("ctrl enter pressed");
		}
	}

	onMount(() => {
		off = on(window, "keydown", handle);

		return () => {
			off();
		};
	});

	function createBit(label: string, content: string) {
		const bit: Bit = {
			type: "Bit",
			id: crypto.randomUUID(),
			label,
			content,
		};
		jsonStore.addBit(bit);
	}

	function createGroup(name: string) {
		const group: Group = {
			type: "Group",
			id: crypto.randomUUID(),
			name,
			children: [],
		};
		jsonStore.addGroup(group);
	}

	function handleOnClick() {
		// console.log("click")
		switch (addWhat) {
			case "bit":
				createBit(label, content);
				break;
			case "group":
				createGroup(name);
				break;
			case "group":
				// createBit(label, content);
				break;
			default:
				console.log("addWhat state is invalid");
		}
	}
</script>

<div class="h-screen w-screen flex flex-col justify-center items-center">
	<HeaderLogo />
	<div
		class="absolute left-0 top-1/2 transform -translate-y-1/2 text-center flex-col flex px-10 space-y-10"
	>
		<button
			onclick={() => {
				addWhat = "bit";
			}}
			class="font-bold"
		>
			<p class="text-gray-400">(1)</p>
			<p class="font-bold hover:underline">bit</p>
		</button>
		<button
			onclick={() => {
				addWhat = "group";
			}}
			class="font-bold"
		>
			<p class="text-gray-400">(2)</p>
			<p class="font-bold hover:underline">group</p>
		</button>
		<button
			onclick={() => {
				addWhat = "tag";
			}}
			class="font-bold"
		>
			<p class="text-gray-400">(3)</p>
			<p class="font-bold hover:underline">tag</p>
		</button>
	</div>
	<div class="w-full h-full px-30 pt-50 pb-30">
		<div class="flex w-full">
			<button
				onclick={() => {
					handleOnClick();
				}}
				class="ml-auto flex font-bold hover:underline"
			>
				create
			</button>
			<p class="text-gray-400 px-2">(CTRL + ENTER)</p>
		</div>
		<div class="w-full h-full bg-gray-50 p-10">
			{#if addWhat == "bit"}
				<NewBit bind:label bind:content />
			{:else if addWhat == "group"}
				<NewGroup />
			{:else if addWhat == "tag"}
				<NewTag />
			{:else}
				<p>choose something you want to create</p>
			{/if}
		</div>
	</div>
</div>
