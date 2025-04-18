import { assert, it } from 'hippogriff';
import type { IAnalysisResult, ITupleType } from '../models/types.models.js';
import { numberTypeWith, stringType, stringTypeWith } from '../testTypes.js';
import addTuple from './addTuple.js';

it('should add to a matching tuple', () => {
	const analysisResult: IAnalysisResult = {
		enums: [],
		tuples: [{
			path: ['animals'],
			type: {
				type: 'tuple',
				types: [
					stringTypeWith(['dogs', 'cats']),
					numberTypeWith([1, 2, 3]),
					numberTypeWith([1, 2, 3])
				],
				count: 5
			},
			count: 3,
			refs: 1,
			isInArray: false
		}, {
			path: ['fruit'],
			type: {
				type: 'tuple',
				types: [
					stringTypeWith(['apple', 'kiwi']),
					numberTypeWith([1, 2, 3])
				],
				count: 5
			},
			count: 5,
			refs: 7,
			isInArray: false
		}],
		interfaces: [],
		analysisDuration: 0
	};

	const value: ITupleType = {
		type: 'tuple',
		types: [
			stringTypeWith(['apple', 'kiwi']),
			numberTypeWith([1, 2, 3])
		],
		count: 7
	};

	addTuple(analysisResult, value, ['fruit'], false);

	assert.equal(analysisResult, {
		enums: [],
		tuples: [{
			path: ['animals'],
			type: {
				type: 'tuple',
				types: [
					stringTypeWith(['dogs', 'cats']),
					numberTypeWith([1, 2, 3]),
					numberTypeWith([1, 2, 3])
				],
				count: 5
			},
			count: 3,
			refs: 1,
			isInArray: false
		}, {
			path: ['fruit'],
			type: {
				type: 'tuple',
				types: [
					stringTypeWith(['apple', 'kiwi']),
					numberTypeWith([1, 2, 3])
				],
				count: 5
			},
			count: 12,
			refs: 8,
			isInArray: false
		}],
		interfaces: [],
		analysisDuration: 0
	});
	assert.equal(value, {
		type: 'tuple',
		types: [
			stringTypeWith(['apple', 'kiwi']),
			numberTypeWith([1, 2, 3])
		],
		count: 7,
		index: 1
	});
});

it('should add a new tuple', () => {
	const analysisResult: IAnalysisResult = {
		enums: [],
		tuples: [{
			path: ['animals'],
			type: {
				type: 'tuple',
				types: [
					stringTypeWith(['dogs', 'cats']),
					numberTypeWith([1, 2, 3]),
					numberTypeWith([1, 2, 3])
				],
				count: 5
			},
			count: 3,
			refs: 1,
			isInArray: false
		}, {
			path: ['fruit'],
			type: {
				type: 'tuple',
				types: [
					stringTypeWith(['apple', 'kiwi']),
					stringType
				],
				count: 5
			},
			count: 5,
			refs: 7,
			isInArray: false
		}],
		interfaces: [],
		analysisDuration: 0
	};

	const value: ITupleType = {
		type: 'tuple',
		types: [
			stringTypeWith(['apple', 'kiwi']),
			numberTypeWith([1, 2, 5])
		],
		count: 7
	};

	addTuple(analysisResult, value, ['fruit'], false);

	assert.equal(analysisResult, {
		enums: [],
		tuples: [{
			path: ['animals'],
			type: {
				type: 'tuple',
				types: [
					stringTypeWith(['dogs', 'cats']),
					numberTypeWith([1, 2, 3]),
					numberTypeWith([1, 2, 3])
				],
				count: 5
			},
			count: 3,
			refs: 1,
			isInArray: false
		}, {
			path: ['fruit'],
			type: {
				type: 'tuple',
				types: [
					stringTypeWith(['apple', 'kiwi']),
					stringType
				],
				count: 5
			},
			count: 5,
			refs: 7,
			isInArray: false
		}, {
			path: ['fruit'],
			type: {
				type: 'tuple',
				types: [
					stringTypeWith(['apple', 'kiwi']),
					numberTypeWith([1, 2, 5])
				],
				count: 7,
				index: 2
			},
			count: 7,
			refs: 1,
			isInArray: false
		}],
		interfaces: [],
		analysisDuration: 0
	});
	assert.equal(value, {
		type: 'tuple',
		types: [
			stringTypeWith(['apple', 'kiwi']),
			numberTypeWith([1, 2, 5])
		],
		count: 7,
		index: 2
	});
});
