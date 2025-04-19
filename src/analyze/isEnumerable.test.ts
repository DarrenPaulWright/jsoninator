import { assert, describe, it } from 'hippogriff';
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
			values: ['apples', 'bananas', '1234']
		}, 'fruit', 20);

		assert.is(result, true);
	});

	badNames.forEach((name) => {
		it(`should return false if name is ${ name }`, () => {
			const result = isEnumerable.strings({
				type: 'string',
				values: ['apples', 'bananas']
			}, name, 20);

			assert.is(result, false);
		});

		it(`should return false if name is ${ name }Something`, () => {
			const result = isEnumerable.strings({
				type: 'string',
				values: ['apples', 'bananas']
			}, `${ name }Something`, 20);

			assert.is(result, false);
		});
	});

	it('should return false length of values is 1', () => {
		const result = isEnumerable.strings({
			type: 'string',
			values: ['apples']
		}, 'fruit', 3);

		assert.is(result, false);
	});

	it('should return false length of values is more than max', () => {
		const result = isEnumerable.strings({
			type: 'string',
			values: new Array(31)
				.fill(1)
				.map((_x, index) => `apples${ index }`)
		}, 'fruit', 3);

		assert.is(result, false);
	});

	it('should return false if count is less than twice the length of values', () => {
		const result = isEnumerable.strings({
			type: 'string',
			values: ['apples', 'bananas']
		}, 'fruit', 3);

		assert.is(result, false);
	});

	it('should return false if a value has length greater than 20', () => {
		const result = isEnumerable.strings({
			type: 'string',
			values: ['apples', 'bananasIsVeryVeryLong']
		}, 'fruit', 30);

		assert.is(result, false);
	});

	it('should return false if a value is not alphaNumeric', () => {
		const result = isEnumerable.strings({
			type: 'string',
			values: ['apples', 'bananas!']
		}, 'fruit', 30);

		assert.is(result, false);
	});

	it('should return false if values are all year like', () => {
		const result = isEnumerable.strings({
			type: 'string',
			values: ['1234', '5678!']
		}, 'fruit', 30);

		assert.is(result, false);
	});
});

describe('numbers', () => {
	it('should return true', () => {
		const result = isEnumerable.numbers({
			type: 'number',
			values: [1, 2, 3]
		}, 'fruit', 20);

		assert.is(result, true);
	});

	badNames.forEach((name) => {
		it(`should return false if name is ${ name }`, () => {
			const result = isEnumerable.numbers({
				type: 'number',
				values: [1, 2, 3]
			}, name, 20);

			assert.is(result, false);
		});

		it(`should return false if name is ${ name }Something`, () => {
			const result = isEnumerable.numbers({
				type: 'number',
				values: [1, 2, 3]
			}, `${ name }Something`, 20);

			assert.is(result, false);
		});
	});

	it('should return false length of values is 1', () => {
		const result = isEnumerable.numbers({
			type: 'number',
			values: [1]
		}, 'fruit', 3);

		assert.is(result, false);
	});

	it('should return false length of values is more than max', () => {
		const result = isEnumerable.numbers({
			type: 'number',
			values: new Array(31)
				.fill(1)
				.map((_x, index) => index)
		}, 'fruit', 3);

		assert.is(result, false);
	});

	it('should return false if count is less than twice the length of values', () => {
		const result = isEnumerable.numbers({
			type: 'number',
			values: [1, 2]
		}, 'fruit', 3);

		assert.is(result, false);
	});

	it('should return false if property ends in "s"', () => {
		const result = isEnumerable.numbers({
			type: 'number',
			values: [1, 2]
		}, 'fruits', 30);

		assert.is(result, false);
	});

	it('should return false if a value is not an integer', () => {
		const result = isEnumerable.numbers({
			type: 'number',
			values: [1, 2.1]
		}, 'fruit', 30);

		assert.is(result, false);
	});
});
