<script lang="ts">
	import HeaderLogo from "$lib/header-logo.svelte";
	import ViewTexts from "./ViewTexts.svelte";
	import ViewGroups from "./ViewGroups.svelte";
	import ViewTags from "./ViewTags.svelte";
	let viewWhat = "";
</script>

<div class="h-screen w-screen flex flex-col justify-center items-center">
	<HeaderLogo />
	<div
		class="absolute left-0 top-1/2 transform -translate-y-1/2 text-center flex-col flex px-10 space-y-10"
	>
		<button
			onclick={() => {
				viewWhat = "text";
			}}
			class="font-bold"
		>
			<p class="text-gray-400">(1)</p>
			<p class="font-bold hover:underline">text</p>
		</button>
		<button
			onclick={() => {
				viewWhat = "group";
			}}
			class="font-bold"
		>
			<p class="text-gray-400">(2)</p>
			<p class="font-bold hover:underline">group</p>
		</button>
		<button
			onclick={() => {
				viewWhat = "tag";
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
		<div class="w-full h-full bg-gray-50 p-10 overflow-auto">
			{#if viewWhat == "text"}
				<ViewTexts/>
			{:else if viewWhat == "group"}
				<ViewGroups/>
			{:else if viewWhat == "tag"}
				<ViewTags/>
			{:else}
				<p>choose something you want to view</p>
			{/if}
		</div>
	</div>
</div>

