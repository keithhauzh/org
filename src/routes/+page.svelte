<script lang="ts">
	import Input from "$lib/components/ui/input/input.svelte";
	import Label from "$lib/components/ui/label/label.svelte";
	import HeaderLogo from "$lib/header-logo.svelte";
	import type { OrgNode } from "$lib/types";
    import { parse } from "svelte/compiler";
	import { jsonStore } from "../stores/jsonStore";

	let fileInput: FileList | undefined;

	async function handleUpload() {
		const file = fileInput?.[0];
		if (!file) return;

		const text = await file.text();
		let parsedJson: JSON;

		try {
			parsedJson = JSON.parse(text);
			// console.log(parsedJson)
			// console.log("Is array:", Array.isArray(parsedJson))
			const validNodes = validateAndProcess(parsedJson);
			if (validNodes) {
				jsonStore.replaceAll(validNodes);
			}else{
				// console.log("Invalid JSON for org")
			}
			// console.log(validNodes);
		} catch {
			console.log("Invalid JSON");
			return;
		}
	}

	function validateAndProcess(json: unknown): OrgNode[] | null {
		if (!Array.isArray(json)) return null;
		if (json.length === 0) return null;
		if (!json.every(isNode)) return null;
		return json;
	}

	function isNode(obj: any): obj is OrgNode {
		if (!obj || typeof obj !== "object") return false;

		if (obj.type === "Bit") {
			return (
				typeof obj.id === "string" &&
				typeof obj.label === "string" &&
				typeof obj.content === "string"
			);
		}

		if (obj.type === "Group") {
			return (
				typeof obj.id === "string" &&
				typeof obj.name === "string" &&
				Array.isArray(obj.children) &&
				obj.children.every(isNode)
			);
		}

		return false;
	}
</script>

<div class="flex flex-col w-screen h-screen justify-center items-center">
	<HeaderLogo />
	<div class="flex-col flex space-y-5">
		<button class="font-bold text-lg hover:underline text-center">
			<a href="/new"> New JSON file </a>
		</button>
		<p class="text-center">or</p>
		<div>
			<Label class="flex justify-center font-bold text-lg pb-3"
				>Import an existing JSON file for Org</Label
			>
			<Input
				type="file"
				accept=".json"
				class="text-center"
				bind:files={fileInput}
				onchange={handleUpload}
			/>
		</div>
	</div>
</div>
