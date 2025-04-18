import type { IInterfaceObject } from '../models/types.models.js';
import reduceUnionTypes from './reduceUnionTypes.js';

const mergeObject = (parent: IInterfaceObject, child: IInterfaceObject): void => {
	for (const key in child) {
		if (key in parent) {
			const result = reduceUnionTypes([
				...parent[key].types,
				...child[key].types
			], true);

			parent[key].types = result[0];
			parent[key].optional ||= result[1] || child[key].optional;
		}
		else {
			parent[key] = child[key];
			parent[key].optional = true;
		}
	}

	for (const key in parent) {
		if (!(key in child)) {
			parent[key].optional = true;
		}
	}
};

export default mergeObject;
