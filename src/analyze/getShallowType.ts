import type { PrimitiveTypes } from '../models/types.models.js';

const shallowTypeMap: { [key: string]: PrimitiveTypes } = {
	string: 'string',
	boolean: 'boolean',
	number: 'number'
};

const getShallowType = (data: unknown): PrimitiveTypes => {
	return shallowTypeMap[typeof data] ?? 'null';
};

export default getShallowType;
