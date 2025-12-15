<script lang="ts">
	import Input from "$lib/components/ui/input/input.svelte";
	import Label from "$lib/components/ui/label/label.svelte";
	import HeaderLogo from "$lib/header-logo.svelte";
	import type { Node } from "$lib/types";

	let fileInput: FileList | undefined;

	async function handleUpload() {
		const file = fileInput?.[0];
		if (!file) return;

		const text = await file.text();
		let parsedJson: JSON;

		try {
			parsedJson = JSON.parse(text);
			validateAndProcess(parsedJson);
			console.log("success")
		} catch {
			console.log("Invalid JSON");
			return;
		}
	}

	function validateAndProcess(json: unknown): Node[] | null {
		if (!Array.isArray(json))return null;
		if (!json.every(isNode))return null;
		return json;
	}

	function isNode(obj: any): obj is Node {
		if (!obj || typeof obj !== "object") return false;

		if (obj.type === "Text") {
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
