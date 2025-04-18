import type { IInterfaceObject, IInterfaceStructure } from '../models/types.models.js';
import getMaxScore from '../utility/getMaxScore.js';
import mergeObject from './mergeObject.js';
import scoreInterface from './scoreInterface.js';

const saveInterface = (
	child: IInterfaceObject,
	path: Array<string>,
	interfaces: Array<IInterfaceStructure>
): number => {
	const max = getMaxScore(interfaces, (parent) => {
		return scoreInterface(
			parent.data,
			child,
			parent.path[parent.path.length - 1],
			path[path.length - 1]
		);
	});

	if (max.score < 0.6) {
		interfaces.push({
			path,
			count: 1,
			refs: 0,
			isInArray: false,
			data: child
		});

		return interfaces.length - 1;
	}

	mergeObject(interfaces[max.index].data, child);
	interfaces[max.index].count++;

	return max.index;
};

export default saveInterface;
