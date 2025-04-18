import type { IType } from '../models/types.models.js';

const TYPE_SORT_ORDER: { [types: string]: number } = {
	null: 1,
	boolean: 2,
	number: 3,
	string: 4,
	interface: 5,
	array: 6,
	tuple: 7
};

const sortStrings = (a: string, b: string): number => {
	return a.localeCompare(b, 'default', {
		sensitivity: 'base',
		numeric: true
	});
};

export const sortEntryKeys = (a: [string, unknown], b: [string, unknown]): number => {
	return sortStrings(a[0], b[0]);
};

export const sortEntriesLast = (items: Array<string>) => {
	return (a: [string, unknown], b: [string, unknown]): number => {
		const aOptional = items.includes(a[0]);
		const bOptional = items.includes(b[0]);

		if (aOptional && !bOptional) {
			return 1;
		}

		return !aOptional && bOptional ? -1 : 0;
	};
};

export const sortTypes = (a: IType, b: IType): number => {
	const aOrder = TYPE_SORT_ORDER[a.type] ?? 10;
	const bOrder = TYPE_SORT_ORDER[b.type] ?? 10;

	if (aOrder < bOrder) {
		return -1;
	}

	return bOrder < aOrder ? 1 : 0;
};
