export interface Text {
	type: "Text";
	id: string;
	label: string;
	content: string
	tag?: Tag[];
}

export interface Group {
	type: "Group";
	id: string;
	name: string;
	children: array<group | note>
}

export interface Tag {
	type: "Tag";
	id: string;
	name: string;
}

export type Node = Group | Text;

