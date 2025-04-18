import { assert, it } from 'hippogriff';
import type { IType } from '../models/types.models.js';
import {
	booleanType,
	emptyArrayType,
	nullType,
	numberType,
	stringType,
	tupleStringType
} from '../testTypes.js';
import { sortEntriesLast, sortEntryKeys, sortTypes } from './sorters.js';

it('should sort entry keys', () => {
	const entries = Object.entries({
		apples: 1,
		item10: 1,
		kiwi: 1,
		item2: 1,
		bananas: 1,
		item1: 1
	});

	entries.sort(sortEntryKeys);

	assert.equal(entries, [
		['apples', 1],
		['bananas', 1],
		['item1', 1],
		['item2', 1],
		['item10', 1],
		['kiwi', 1]
	]);
});

it('should sort selected entries last', () => {
	const entries = Object.entries({
		apples: 1,
		item10: 1,
		kiwi: 1,
		item2: 1,
		bananas: 1,
		item1: 1
	});

	entries.sort(sortEntriesLast(['bananas', 'kiwi']));

	assert.equal(entries, [
		['apples', 1],
		['item10', 1],
		['item2', 1],
		['item1', 1],
		['kiwi', 1],
		['bananas', 1]
	]);
});

it('should sort types', () => {
	const items: Array<IType> = [
		{
			type: 'interface',
			index: 3
		},
		numberType,
		nullType,
		booleanType,
		emptyArrayType,
		tupleStringType,
		stringType
	];

	items.sort(sortTypes);

	assert.equal(items, [
		nullType,
		booleanType,
		numberType,
		stringType,
		{
			type: 'interface',
			index: 3
		},
		emptyArrayType,
		tupleStringType
	]);
});
