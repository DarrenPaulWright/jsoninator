import type { IType, IUnionType } from '../models/types.models.js';
import isAllValuesSame from '../utility/isAllValuesSame.js';

export const isAllTypesIdentical = (
	a: Array<IType>,
	b: Array<IType>
): boolean => {
	return a.length === b.length &&
		a.every((aSub, index) => {
			// eslint-disable-next-line @typescript-eslint/no-use-before-define
			return isSameType(aSub, b[index]);
		});
};

export const isAllTypesSame = (
	a: Array<IType>,
	b: Array<IType>
): boolean => {
	return a.length === b.length &&
		a.every((aSub) => {
			// eslint-disable-next-line @typescript-eslint/no-use-before-define
			return b.some((bSub) => isSameType(aSub, bSub));
		});
};

const isSameType = (
	a: IType | IUnionType,
	b: IType | IUnionType,
	isStrict = false
): boolean => {
	if (a.type !== b.type) {
		return false;
	}

	if (a.type === 'union' && b.type === 'union') {
		return isAllTypesSame(a.types, b.types);
	}

	if (a.type === 'interface' && b.type === 'interface') {
		return a.index === b.index;
	}

	if (a.type === 'array' && b.type === 'array') {
		return isAllTypesSame(a.types, b.types);
	}

	if (a.type === 'tuple' && b.type === 'tuple') {
		return isAllTypesIdentical(a.types, b.types);
	}

	if (isStrict) {
		if (a.type === 'number' && b.type === 'number') {
			return isAllValuesSame(a.values, b.values);
		}

		if (a.type === 'string' && b.type === 'string') {
			return isAllValuesSame(a.values, b.values);
		}
	}

	return true;
};

export default isSameType;
