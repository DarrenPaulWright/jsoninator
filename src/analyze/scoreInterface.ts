import type { IInterfaceObject } from '../models/types.models.js';

const ratio = (count: number, total: number): number => {
	return total === 0 ? 1 : count / total;
};

const scoreInterface = (
	parent: IInterfaceObject,
	child: IInterfaceObject,
	parentName: string,
	childName: string
): number => {
	let totalRequired = 0;
	let matchingRequired = 0;
	let matchingOptional = 0;

	for (const key in parent) {
		if (parent[key].optional) {
			if (key in child) {
				matchingOptional++;
			}
		}
		else {
			totalRequired++;

			if (key in child) {
				matchingRequired++;
			}
		}
	}

	return (parentName === childName ? 0.3 : 0) +
		((
			ratio(matchingRequired, totalRequired) +
			ratio(matchingRequired + matchingOptional, Object.keys(child).length)
		) * 0.35);
};

export default scoreInterface;
