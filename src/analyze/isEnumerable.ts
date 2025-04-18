import { sentenceCase } from 'change-case';
import type { INumberType, IStringType } from '../models/types.models.js';
import isAlphaNumeric from '../utility/isAlphaNumeric.js';
import isYearLike from '../utility/isYearLike.js';

const excludeValues: Array<string> = [
	'year',
	'date',
	'time',
	'description',
	'name',
	'id',
	'index',
	'number',
	'count',
	'total',
	'length',
	'score',
	'link',
	'url'
];

const verifyProperty = (property: string): boolean => {
	const key = sentenceCase(property).toLowerCase();

	return excludeValues.every((value) => !key.includes(value));
};

const isEnumerable = {
	strings: (item: IStringType, property: string, count: number): boolean => {
		const values = item.values;

		return values.length > 1 &&
			values.length < 30 &&
			verifyProperty(property) &&
			values.length * 2 < count &&
			values.every((value: string) => {
				return value.length < 20 && isAlphaNumeric(value);
			}) &&
			!values.every((value: string) => isYearLike(value));
	},
	numbers: (item: INumberType, property: string, count: number): boolean => {
		const values = item.values;

		return values.length > 1 &&
			values.length < 20 &&
			verifyProperty(property) &&
			values.length * 2 < count &&
			!property.endsWith('s') &&
			values.every((value: number) => Math.round(value) === value);
	}
};

export default isEnumerable;
