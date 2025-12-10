interface Note {
	type: "note";
	id: string;
	label: string;
	content: string
}

interface Group {
	type: "group";
	id: string;
	name: string;
	children: Array<Group | Note>
}

type Node = Group | Note;

