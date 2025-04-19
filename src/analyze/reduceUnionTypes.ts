import type { IArrayType, INumberType, ITupleType, IType } from '../models/types.models.js';
import isSameType, { isAllTypesIdentical } from './isSameType.js';

const reduceTuplesToArray = (
	parent: ITupleType | IArrayType,
	child: ITupleType | IArrayType
): void => {
	parent.type = 'array';
	// eslint-disable-next-line @typescript-eslint/no-use-before-define
	parent.types = reduceUnionTypes([
		...parent.types,
		...(child as ITupleType).types
	])[0];
	parent.count += child.count;
};

const mergeTypes = <T extends IType>(parent: T, child: T): void => {
	if (parent.type === child.type) {
		if (parent.type === 'string' || parent.type === 'number') {
			(child as INumberType).values.forEach((item: number) => {
				if (!(parent as INumberType).values.includes(item)) {
					(parent as INumberType).values.push(item);
				}
			});
		}

		if (parent.type === 'array') {
			// eslint-disable-next-line @typescript-eslint/no-use-before-define
			parent.types = reduceUnionTypes([
				...parent.types,
				...(child as IArrayType).types
			])[0];
			parent.count += (child as IArrayType).count;
		}

		if (parent.type === 'tuple') {
			if (isAllTypesIdentical(parent.types, (child as ITupleType).types)) {
				parent.types.forEach((value, index) => {
					mergeTypes(value, (child as ITupleType).types[index]);
				});
				parent.count += (child as ITupleType).count;
			}
			else {
				reduceTuplesToArray(parent, (child as ITupleType));
			}
		}
	}
	else if (
		(parent.type === 'array' && child.type === 'tuple') ||
		(parent.type === 'tuple' && child.type === 'array')
	) {
		reduceTuplesToArray(parent, (child as ITupleType));
	}
};

const reduceUnionTypes = (
	values: Array<IType>,
	removeNull = false,
	isCleanup = false
): [Array<IType>, boolean] => {
	let isOptional = false;

	const output = values.filter((item, index) => {
		if (removeNull && item.type === 'null') {
			isOptional = true;

			return false;
		}

		const matchIndex = values.findIndex((item2, index2) => {
			return index === index2 ||
				((item.type === 'array' || item.type === 'tuple') &&
					(item2.type === 'array' || item2.type === 'tuple')) ||
					isSameType(item, item2);
		});

		if (matchIndex !== index) {
			mergeTypes(values[matchIndex], item);
		}

		if (isCleanup && item.type === 'tuple' && item.count < 3) {
			reduceTuplesToArray(item, { type: 'tuple', types: [], count: 0 });
		}

		return matchIndex === index;
	});

	return [output, isOptional];
};

export default reduceUnionTypes;
