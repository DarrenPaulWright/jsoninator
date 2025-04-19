import { assert, describe, it } from 'hippogriff';
import { numberTypeWith, stringTypeWith } from '../testTypes.js';
import isEnumerable from './isEnumerable.js';

const badNames: Array<string> = [
	'harvestYear',
	'endDate',
	'startTime',
	'fruitDescription',
	'nameOfFruit',
	'id',
	'fruitId',
	'harvestIndex',
	'favoriteNumber',
	'favoriteCount',
	'favoriteTotal',
	'nameLength',
	'favoriteScore',
	'wikiLink',
	'wikiUrl'
];

describe('strings', () => {
	it('should return true', () => {
		const result = isEnumerable.strings({
			type: 'string',
			values: ['apples', 'bananas', '1234'],
			valuesMap: { apples: true, bananas: true }
		}, 'fruit', 20);

		assert.is(result, true);
	});

	badNames.forEach((name) => {
		it(`should return false if name is ${ name }`, () => {
			const result = isEnumerable.strings({
				type: 'string',
				values: ['apples', 'bananas'],
				valuesMap: { apples: true, bananas: true }
			}, name, 20);

			assert.is(result, false);
		});

		it(`should return false if name is ${ name }Something`, () => {
			const result = isEnumerable.strings({
				type: 'string',
				values: ['apples', 'bananas'],
				valuesMap: { apples: true, bananas: true }
			}, `${ name }Something`, 20);

			assert.is(result, false);
		});
	});

	it('should return false length of values is 1', () => {
		const result = isEnumerable.strings({
			type: 'string',
			values: ['apples'],
			valuesMap: { apples: true }
		}, 'fruit', 3);

		assert.is(result, false);
	});

	it('should return false length of values is more than max', () => {
		const result = isEnumerable.strings(
			stringTypeWith(new Array(31)
				.fill(1)
				.map((_x, index) => `apples${ index }`)),
			'fruit',
			3
		);

		assert.is(result, false);
	});

	it('should return false if count is less than twice the length of values', () => {
		const result = isEnumerable.strings({
			type: 'string',
			values: ['apples', 'bananas'],
			valuesMap: { apples: true, bananas: true }
		}, 'fruit', 3);

		assert.is(result, false);
	});

	it('should return false if a value has length greater than 20', () => {
		const result = isEnumerable.strings({
			type: 'string',
			values: ['apples', 'bananasIsVeryVeryLong'],
			valuesMap: { apples: true, bananas: true }
		}, 'fruit', 30);

		assert.is(result, false);
	});

	it('should return false if a value is not alphaNumeric', () => {
		const result = isEnumerable.strings({
			type: 'string',
			values: ['apples', 'bananas!'],
			valuesMap: { apples: true, bananas: true }
		}, 'fruit', 30);

		assert.is(result, false);
	});

	it('should return false if values are all year like', () => {
		const result = isEnumerable.strings({
			type: 'string',
			values: ['1234', '5678!'],
			valuesMap: { 1234: true, '5678!': true }
		}, 'fruit', 30);

		assert.is(result, false);
	});
});

describe('numbers', () => {
	it('should return true', () => {
		const result = isEnumerable.numbers({
			type: 'number',
			values: [1, 2, 3],
			valuesMap: { 1: true, 2: true, 3: true }
		}, 'fruit', 20);

		assert.is(result, true);
	});

	badNames.forEach((name) => {
		it(`should return false if name is ${ name }`, () => {
			const result = isEnumerable.numbers({
				type: 'number',
				values: [1, 2, 3],
				valuesMap: { 1: true, 2: true, 3: true }
			}, name, 20);

			assert.is(result, false);
		});

		it(`should return false if name is ${ name }Something`, () => {
			const result = isEnumerable.numbers({
				type: 'number',
				values: [1, 2, 3],
				valuesMap: { 1: true, 2: true, 3: true }
			}, `${ name }Something`, 20);

			assert.is(result, false);
		});
	});

	it('should return false length of values is 1', () => {
		const result = isEnumerable.numbers({
			type: 'number',
			values: [1],
			valuesMap: { 1: true }
		}, 'fruit', 3);

		assert.is(result, false);
	});

	it('should return false length of values is more than max', () => {
		const result = isEnumerable.numbers(
			numberTypeWith(new Array(31)
				.fill(1)
				.map((_x, index) => index)),
			'fruit',
			3
		);

		assert.is(result, false);
	});

	it('should return false if count is less than twice the length of values', () => {
		const result = isEnumerable.numbers({
			type: 'number',
			values: [1, 2],
			valuesMap: { 1: true, 2: true }
		}, 'fruit', 3);

		assert.is(result, false);
	});

	it('should return false if property ends in "s"', () => {
		const result = isEnumerable.numbers({
			type: 'number',
			values: [1, 2],
			valuesMap: { 1: true, 2: true }
		}, 'fruits', 30);

		assert.is(result, false);
	});

	it('should return false if a value is not an integer', () => {
		const result = isEnumerable.numbers({
			type: 'number',
			values: [1, 2.1],
			valuesMap: { 1: true, 2.1: true }
		}, 'fruit', 30);

		assert.is(result, false);
	});
});
