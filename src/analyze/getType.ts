import type {
	IAnalysisResult,
	IInputObject,
	IInterfaceObject,
	IType
} from '../models/types.models.js';
import countReferences from './countReferences.js';
import getShallowType from './getShallowType.js';
import isSameType from './isSameType.js';
import reduceUnionTypes from './reduceUnionTypes.js';
import saveInterface from './saveInterface.js';

const cleanup = (result: IAnalysisResult): void => {
	result.interfaces.forEach((interfaceData) => {
		Object.entries(interfaceData.data).forEach(([name, union]) => {
			const results = reduceUnionTypes(union.types, true, true);

			union.types = results[0];
			union.optional ||= results[1];

			countReferences(
				[...interfaceData.path, name],
				union.types,
				result,
				interfaceData
			);
		});
	});
};

const getType = async (
	data: unknown,
	result: IAnalysisResult,
	path: Array<string>,
	depth = 0
): Promise<IType> => {
	const start = depth === 0 ? Date.now() : 0;
	// eslint-disable-next-line @typescript-eslint/init-declarations
	let returnValue: IType;

	if (Array.isArray(data)) {
		const typeMap = await Promise.all((data as Array<unknown>).map((value) => {
			const name = path[path.length - 1];
			const newName = name.endsWith('s') ? name.slice(0, -1) : name;

			return getType(value, result, [...path.slice(0, -1), newName], depth + 1);
		}));

		returnValue = depth > 0 && data.length > 1 && data.length < 10 ?
			{
				type: 'tuple',
				types: typeMap,
				count: 1
			} :
			{
				type: 'array',
				types: reduceUnionTypes(typeMap)[0],
				count: 1
			};
	}
	else if (data?.constructor === Object) {
		const output: IInterfaceObject = {};
		const entries = Object.entries(data as IInputObject);
		let isIndexable = entries.length > 10;

		const values = await Promise.all(entries.map(([key, value]) => {
			return getType(value, result, [...path, key], depth + 1);
		}));

		entries.forEach(([key], index) => {
			output[key] = {
				type: 'union',
				types: [values[index]],
				optional: values[index].type === 'null'
			};

			if (
				isIndexable &&
				index !== 0 &&
				(key.length !== entries[index - 1][0].length ||
					!isSameType(output[entries[index - 1][0]], output[key], true))
			) {
				isIndexable = false;
			}
		});

		returnValue = {
			type: 'interface',
			index: saveInterface(
				isIndexable ?
					{
						'[key: string]': {
							type: 'union',
							types: reduceUnionTypes(
								Object.values(output).flatMap((value) => value.types)
							)[0],
							optional: false
						}
					} :
					output,
				path,
				result.interfaces
			)
		};
	}
	else {
		const shallowType = getShallowType(data);

		if (shallowType === 'string') {
			returnValue = {
				type: shallowType,
				values: [data as string]
			};
		}
		else if (shallowType === 'number') {
			returnValue = {
				type: shallowType,
				values: [data as number]
			};
		}
		else {
			returnValue = { type: shallowType };
		}
	}

	if (depth === 0) {
		cleanup(result);
		result.analysisDuration = Date.now() - start;
	}

	return returnValue;
};

export default getType;
