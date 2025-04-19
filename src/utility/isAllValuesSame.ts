import type { INumberType, IStringType } from '../models/types.models.js';

export const isAllValuesSame = <Type extends INumberType | IStringType>(
	a: Type,
	b: Type
): boolean => {
	return a.values.length === b.values.length &&

		// @ts-expect-error type
		a.values.every((aSub) => b.valuesMap[aSub]);
};

export default isAllValuesSame;
