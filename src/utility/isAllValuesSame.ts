import type { List } from 'hord';

export const isAllValuesSame = (
	a: List,
	b: List
): boolean => {
	return a.length === b.length && a.every((aSub: string) => b.includes(aSub));
};

export default isAllValuesSame;
