import { get, writable } from "svelte/store"
import { browser } from "$app/environment";
import type { Bit, Group, OrgNode, Tag } from '$lib/types';

function findNodeById(nodes: OrgNode[], id: string): OrgNode | null {
	for (const n of nodes) {
		if (n.id === id) return n
		if (n.type === "Group") {
			const childResult = findNodeById(n.children, id);
			if (childResult) return childResult
		}
	}
	return null;
}

function updateNodeById(nodes: OrgNode[], id: string, data: Partial<OrgNode>): OrgNode[] {
	return nodes.map(n => {
		if (n.id === id) {
			if (n.type === "Group") {
				return { ...n, ...data } as Group
			}
			if (n.type === "Bit") {
				return { ...n, ...data } as Bit
			}
		}
		if (n.type === "Group") {
			return { ...n, children: updateNodeById(n.children, id, data) };
		}
		return n;
	})
}

function deleteNodeById(nodes: OrgNode[], id: string): OrgNode[] {
	return nodes
		.filter(n => n.id !== id)
		.map(n => n.type === "Group" ? { ...n, children: deleteNodeById(n.children, id) } : n);
}

function createJsonStore() {
	const stored = browser ? localStorage.getItem('tempData') : null;
	const data: OrgNode[] = stored ? JSON.parse(stored) : [];
	const { subscribe, set, update } = writable<OrgNode[]>(data);

	return {
		subscribe,

		replaceAll: (nodes: OrgNode[]) => update(() => {
			localStorage.setItem('tempData', JSON.stringify(nodes));
			return nodes;
		}),

		// Bit CRUD
		addBit: (t: Bit) => update(arr => {
			arr.push(t)
			localStorage.setItem('tempData', JSON.stringify(arr));
			return arr;
		}),
		updateBit: (id: string, data: Partial<Bit>) => update(arr => {
			const node = findNodeById(arr, id);
			if (node && node.type === "Bit") {
				arr = updateNodeById(arr, id, data);
				localStorage.setItem("tempData", JSON.stringify(arr));
			}
			return arr;
		}),

		// Group CRUD
		addGroup: (g: Omit<Group, "id">) => update(arr => {
			const newGroup: Group = { ...g, id: crypto.randomUUID(), children: g.children ?? [] };
			arr.push(newGroup);
			localStorage.setItem("tempData", JSON.stringify(arr));
			return arr;
		}),
		updateGroup: (id: string, data: Partial<Group>) => update(arr => {
			const node = findNodeById(arr, id);
			if (node && node.type === "Group") {
				arr = updateNodeById(arr, id, data);
				localStorage.setItem("tempData", JSON.stringify(arr));
			}
			return arr;
		}),

		// Deletion Logic (Works for both text and group)
		deleteNode: (id: string) => update(arr => {
			arr = deleteNodeById(arr, id)
			localStorage.setItem("tempData", JSON.stringify(arr));
			return arr;
		}),

		// Tag CRUD (not a node/node leaf)
		addTag: (textId: string, tag: Tag) => update(arr => {
			const node = findNodeById(arr, textId)
			if (node && node.type === "Bit") {
				node.tag = node.tag ?? [];
				if (!node.tag.find(t => t.id === tag.id)) node.tag.push(tag);
				localStorage.setItem('tempData', JSON.stringify(arr))
			}
			return arr;
		}),
		removeTag: (textId: string, tagId: String) => update(arr => {
			const node = findNodeById(arr, textId);
			if (node && node.type === "Bit" && node.tag) {
				node.tag = node.tag.filter(t => t.id !== tagId);
				localStorage.setItem('tempData', JSON.stringify(arr));
			}
			return arr;
		}),
		validateTags: (textId: string, validIds: string[]) => {
			const node = findNodeById(get(jsonStore), textId);
			if (node && node.type === "Bit" && node.tag) {
				return node.tag.every(t => validIds.includes(t.id));
			}
			return false
		},

		// Clear local storage after session
		clear: () => {
			set([]);
			localStorage.removeItem("tempData");
		},
	}
}

export const jsonStore = createJsonStore()
