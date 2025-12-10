<script lang="ts">
	import HeaderLogo from "$lib/header-logo.svelte";
	import { onMount } from "svelte";
	import { on } from "svelte/events";
	import NewGroup from "./NewGroup.svelte";
	import NewTag from "./NewTag.svelte";
	import NewText from "./NewText.svelte";
	let addWhat = "";

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
</script>

<div class="h-screen w-screen flex flex-col justify-center items-center">
	<HeaderLogo />
	<div
		class="absolute left-0 top-1/2 transform -translate-y-1/2 text-center flex-col flex px-10 space-y-10"
	>
		<button
			onclick={() => {
				addWhat = "text";
			}}
			class="font-bold"
		>
			<p class="text-gray-400">(1)</p>
			<p class="font-bold hover:underline">text</p>
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
				onclick={() => {}}
				class="ml-auto flex font-bold hover:underline"
			>
				create
			</button>
			<p class="text-gray-400 px-2">(CTRL + ENTER)</p>
		</div>
		<div class="w-full h-full bg-gray-50 p-10">
			{#if addWhat == "text"}
				<NewText />
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
