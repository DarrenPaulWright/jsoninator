import { assert, it } from 'hippogriff';
import type { IType } from '../models/types.models.js';
import {
	arrayStringType,
	booleanType,
	interfaceMainType,
	interfaceSubType,
	nullType,
	numberType,
	numberTypeWith,
	stringType,
	stringTypeWith
} from '../testTypes.js';
import reduceUnionTypes from './reduceUnionTypes.js';

it('should handle an empty array', () => {
	const parent: Array<IType> = [];

	assert.equal(reduceUnionTypes(parent), [[], false]);
});

it('should not remove unique types', () => {
	const parent: Array<IType> = [
		stringType,
		numberType,
		booleanType,
		nullType,
		interfaceMainType,
		interfaceSubType,
		arrayStringType

	];

	assert.equal(reduceUnionTypes(parent), [[
		stringType,
		numberType,
		booleanType,
		nullType,
		interfaceMainType,
		interfaceSubType,
		arrayStringType
	], false]);
});

it('should merge number values', () => {
	const parent: Array<IType> = [
		numberTypeWith([1, 2, 3, 4, 5]),
		numberTypeWith([4, 5, 6, 7, 8]),
		numberTypeWith([10])
	];

	assert.equal(reduceUnionTypes(parent), [[
		numberTypeWith([1, 2, 3, 4, 5, 6, 7, 8, 10])
	], false]);
});

it('should merge string values', () => {
	const parent: Array<IType> = [
		stringTypeWith(['apples', 'bananas']),
		stringTypeWith(['bananas']),
		stringTypeWith(['apples', 'kiwis'])
	];

	assert.equal(reduceUnionTypes(parent), [[
		stringTypeWith(['apples', 'bananas', 'kiwis'])
	], false]);
});

it('should not merge strings with numbers', () => {
	const parent: Array<IType> = [
		stringTypeWith(['apples', 'bananas']),
		stringTypeWith(['apples', 'kiwis']),
		numberTypeWith([1, 2, 3, 4, 5]),
		numberTypeWith([4, 5, 6, 7, 8])
	];

	assert.equal(reduceUnionTypes(parent), [[
		stringTypeWith(['apples', 'bananas', 'kiwis']),
		numberTypeWith([1, 2, 3, 4, 5, 6, 7, 8])
	], false]);
});

it('should merge arrays', () => {
	const parent: Array<IType> = [
		{
			type: 'array',
			types: [],
			count: 1
		},
		{
			type: 'array',
			types: [interfaceMainType, numberTypeWith([1, 4])],
			count: 1
		},
		{
			type: 'array',
			types: [numberTypeWith([4, 5])],
			count: 1
		}
	];

	assert.equal(reduceUnionTypes(parent), [[
		{
			type: 'array',
			types: [interfaceMainType, numberTypeWith([1, 4, 5])],
			count: 3
		}
	], false]);
});

it('should reduce like tuples', () => {
	const parent: Array<IType> = [
		{
			type: 'tuple',
			types: [numberTypeWith([1, 2]), numberTypeWith([3, 4])],
			count: 1
		},
		{
			type: 'tuple',
			types: [numberTypeWith([1, 2]), numberTypeWith([3, 4])],
			count: 1
		}
	];

	assert.equal(reduceUnionTypes(parent), [[
		{
			type: 'tuple',
			types: [numberTypeWith([1, 2]), numberTypeWith([3, 4])],
			count: 2
		}
	], false]);
});

it('should reduce different tuples into an array', () => {
	const parent: Array<IType> = [
		{
			type: 'tuple',
			types: [numberTypeWith([1, 2]), numberTypeWith([3, 4])],
			count: 1
		},
		{
			type: 'tuple',
			types: [numberTypeWith([1, 2]), stringTypeWith(['apples'])],
			count: 1
		}
	];

	assert.equal(reduceUnionTypes(parent), [[
		{
			type: 'array',
			types: [numberTypeWith([1, 2, 3, 4]), stringTypeWith(['apples'])],
			count: 2
		}
	], false]);
});

it('should reduce a tuple into an array', () => {
	const parent: Array<IType> = [
		{
			type: 'array',
			types: [numberTypeWith([1, 3, 4])],
			count: 1
		},
		{
			type: 'tuple',
			types: [numberTypeWith([1, 2]), stringTypeWith(['apples'])],
			count: 1
		}
	];

	assert.equal(reduceUnionTypes(parent), [[
		{
			type: 'array',
			types: [numberTypeWith([1, 3, 4, 2]), stringTypeWith(['apples'])],
			count: 2
		}
	], false]);
});

it('should reduce a tuple(2) into an array', () => {
	const parent: Array<IType> = [
		{
			type: 'tuple',
			types: [numberTypeWith([1, 2]), stringTypeWith(['apples'])],
			count: 1
		},
		{
			type: 'array',
			types: [numberTypeWith([1, 3, 4])],
			count: 1
		}
	];

	assert.equal(reduceUnionTypes(parent), [[
		{
			type: 'array',
			types: [numberTypeWith([1, 2, 3, 4]), stringTypeWith(['apples'])],
			count: 2
		}
	], false]);
});

it('should reduce a single instance tuple to an array if cleanup', () => {
	const parent: Array<IType> = [
		{
			type: 'tuple',
			types: [numberTypeWith([1, 2]), stringTypeWith(['apples'])],
			count: 1
		}
	];

	assert.equal(reduceUnionTypes(parent, true, true), [[
		{
			type: 'array',
			types: [numberTypeWith([1, 2]), stringTypeWith(['apples'])],
			count: 1
		}
	], false]);
});

it('should remove null if removeNull is true', () => {
	const parent: Array<IType> = [
		{
			type: 'null'
		},
		{
			type: 'array',
			types: [numberTypeWith([1, 3, 4])],
			count: 1
		}
	];

	assert.equal(reduceUnionTypes(parent, true), [[
		{
			type: 'array',
			types: [numberTypeWith([1, 3, 4])],
			count: 1
		}
	], true]);
});
