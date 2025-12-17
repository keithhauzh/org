export interface Bit {
	type: "Bit";
	id: string;
	label: string;
	content: string
	tag?: Tag[];
}

export interface Group {
	type: "Group";
	id: string;
	name: string;
	children: Array<Group | Bit>
}

export interface Tag {
	type: "Tag";
	id: string;
	name: string;
}

export type OrgNode = Group | Bit;

