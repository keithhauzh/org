<script lang="ts">
	import Input from "$lib/components/ui/input/input.svelte";
	import Label from "$lib/components/ui/label/label.svelte";
	import HeaderLogo from "$lib/header-logo.svelte";

	let fileInput: FileList | undefined;

	async function handleUpload(event: Event) {
		const file = fileInput?.[0];
		if (!file) return;

		const text = await file.text();
		let parsedJson: JSON;

		try {
			parsedJson = JSON.parse(text);
			validateAndProcess(parsedJson);
		} catch {
			console.log("Invalid JSON");
			return;
		}
	}

	function validateAndProcess(json: JSON): Boolean {
		console.log(json);
		if (!isNode(json)) {
			console.log("Invalid JSON format for org");
			return false;
		} else {
			console.log("Valid JSON")
			return true;
		}
	}

	function isNode(obj: any): obj is Node {
		if (!obj || typeof obj !== "object") return false;

		if (obj.type === "note") {
			return (
				typeof obj.id === "string" &&
				typeof obj.label === "string" &&
				typeof obj.content === "string"
			);
		}

		if (obj.type === "group") {
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
	<div>
		<Label class="p-5 flex justify-center font-bold text-lg"
			>Import your json file</Label
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
