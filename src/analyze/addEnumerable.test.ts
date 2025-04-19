import { assert, describe, it } from 'hippogriff';
import type { IAnalysisResult, IInterfaceStructure } from '../models/types.models.js';
import { numberTypeWith, stringTypeWith } from '../testTypes.js';
import addEnumerable from './addEnumerable.js';

describe('strings', () => {
	it('should sort strings', () => {
		const analysisResult: IAnalysisResult = {
			enums: [],
			tuples: [],
			interfaces: [],
			analysisDuration: 0
		};

		const value = stringTypeWith(['apples', 'kiwi', 'bananas']);
		const parent: IInterfaceStructure = {
			path: ['fruit'],
			count: 10,
			refs: 0,
			isInArray: false,
			data: {}
		};

		addEnumerable(analysisResult, value, ['fruit'], parent, false);

		assert.equal(analysisResult, {
			enums: [{
				path: ['fruit'],
				type: {
					type: 'string',
					values: ['apples', 'bananas', 'kiwi'],
					valuesMap: { apples: true, bananas: true, kiwi: true },
					index: 0
				},
				count: 10,
				refs: 1,
				isInArray: false
			}],
			tuples: [],
			interfaces: [],
			analysisDuration: 0
		});
		assert.equal(value, {
			type: 'string',
			values: ['apples', 'bananas', 'kiwi'],
			valuesMap: { apples: true, bananas: true, kiwi: true },
			index: 0
		});
	});

	it('should add to a matching enum', () => {
		const analysisResult: IAnalysisResult = {
			enums: [{
				path: ['animals'],
				type: stringTypeWith(['dogs', 'cats']),
				count: 3,
				refs: 1,
				isInArray: false
			}, {
				path: ['fruit'],
				type: stringTypeWith(['apples', 'bananas', 'kiwi']),
				count: 5,
				refs: 7,
				isInArray: false
			}],
			tuples: [],
			interfaces: [],
			analysisDuration: 0
		};

		const value = stringTypeWith(['apples', 'bananas', 'kiwi']);
		const parent: IInterfaceStructure = {
			path: ['fruit'],
			count: 7,
			refs: 0,
			isInArray: false,
			data: {}
		};

		addEnumerable(analysisResult, value, ['fruit'], parent, false);

		assert.equal(analysisResult, {
			enums: [{
				path: ['animals'],
				type: stringTypeWith(['dogs', 'cats']),
				count: 3,
				refs: 1,
				isInArray: false
			}, {
				path: ['fruit'],
				type: {
					type: 'string',
					values: ['apples', 'bananas', 'kiwi'],
					valuesMap: { apples: true, bananas: true, kiwi: true }
				},
				count: 12,
				refs: 8,
				isInArray: false
			}],
			tuples: [],
			interfaces: [],
			analysisDuration: 0
		});
		assert.equal(value, {
			type: 'string',
			values: ['apples', 'bananas', 'kiwi'],
			valuesMap: { apples: true, bananas: true, kiwi: true },
			index: 1
		});
	});

	it('should add a new enum', () => {
		const analysisResult: IAnalysisResult = {
			enums: [{
				path: ['animals'],
				type: stringTypeWith(['dogs', 'cats']),
				count: 3,
				refs: 1,
				isInArray: false
			}, {
				path: ['fruit'],
				type: stringTypeWith(['apples', 'bananas', 'kiwi']),
				count: 5,
				refs: 7,
				isInArray: false
			}],
			tuples: [],
			interfaces: [],
			analysisDuration: 0
		};

		const value = stringTypeWith(['apples', 'oranges', 'pineapples']);
		const parent: IInterfaceStructure = {
			path: ['fruit'],
			count: 7,
			refs: 0,
			isInArray: false,
			data: {}
		};

		addEnumerable(analysisResult, value, ['fruit'], parent, false);

		assert.equal(analysisResult, {
			enums: [{
				path: ['animals'],
				type: stringTypeWith(['dogs', 'cats']),
				count: 3,
				refs: 1,
				isInArray: false
			}, {
				path: ['fruit'],
				type: {
					type: 'string',
					values: ['apples', 'bananas', 'kiwi'],
					valuesMap: { apples: true, bananas: true, kiwi: true }
				},
				count: 5,
				refs: 7,
				isInArray: false
			}, {
				path: ['fruit'],
				type: {
					type: 'string',
					values: ['apples', 'oranges', 'pineapples'],
					valuesMap: { apples: true, oranges: true, pineapples: true },
					index: 2
				},
				count: 7,
				refs: 1,
				isInArray: false
			}],
			tuples: [],
			interfaces: [],
			analysisDuration: 0
		});
		assert.equal(value, {
			type: 'string',
			values: ['apples', 'oranges', 'pineapples'],
			valuesMap: { apples: true, oranges: true, pineapples: true },
			index: 2
		});
	});
});

describe('numbers', () => {
	it('should sort numbers', () => {
		const analysisResult: IAnalysisResult = {
			enums: [],
			tuples: [],
			interfaces: [],
			analysisDuration: 0
		};

		const value = numberTypeWith([3, 1, 2]);
		const parent: IInterfaceStructure = {
			path: ['fruit'],
			count: 10,
			refs: 0,
			isInArray: false,
			data: {}
		};

		addEnumerable(analysisResult, value, ['fruit'], parent, false);

		assert.equal(analysisResult, {
			enums: [{
				path: ['fruit'],
				type: {
					type: 'number',
					values: [1, 2, 3],
					valuesMap: { 1: true, 2: true, 3: true },
					index: 0
				},
				count: 10,
				refs: 1,
				isInArray: false
			}],
			tuples: [],
			interfaces: [],
			analysisDuration: 0
		});
		assert.equal(value, {
			type: 'number',
			values: [1, 2, 3],
			valuesMap: { 1: true, 2: true, 3: true },
			index: 0
		});
	});

	it('should add to a matching enum', () => {
		const analysisResult: IAnalysisResult = {
			enums: [{
				path: ['animals'],
				type: numberTypeWith([12, 17]),
				count: 3,
				refs: 1,
				isInArray: false
			}, {
				path: ['fruit'],
				type: numberTypeWith([1, 4, 8]),
				count: 5,
				refs: 7,
				isInArray: false
			}],
			tuples: [],
			interfaces: [],
			analysisDuration: 0
		};

		const value = numberTypeWith([1, 4, 8]);
		const parent: IInterfaceStructure = {
			path: ['fruit'],
			count: 7,
			refs: 0,
			isInArray: false,
			data: {}
		};

		addEnumerable(analysisResult, value, ['fruit'], parent, false);

		assert.equal(analysisResult, {
			enums: [{
				path: ['animals'],
				type: numberTypeWith([12, 17]),
				count: 3,
				refs: 1,
				isInArray: false
			}, {
				path: ['fruit'],
				type: {
					type: 'number',
					values: [1, 4, 8],
					valuesMap: { 1: true, 4: true, 8: true }
				},
				count: 12,
				refs: 8,
				isInArray: false
			}],
			tuples: [],
			interfaces: [],
			analysisDuration: 0
		});
		assert.equal(value, {
			type: 'number',
			values: [1, 4, 8],
			valuesMap: { 1: true, 4: true, 8: true },
			index: 1
		});
	});

	it('should add a new enum', () => {
		const analysisResult: IAnalysisResult = {
			enums: [{
				path: ['animals'],
				type: numberTypeWith([12, 17]),
				count: 3,
				refs: 1,
				isInArray: false
			}, {
				path: ['fruit'],
				type: numberTypeWith([1, 4, 8]),
				count: 5,
				refs: 7,
				isInArray: false
			}],
			tuples: [],
			interfaces: [],
			analysisDuration: 0
		};

		const value = numberTypeWith([2, 7, 199]);
		const parent: IInterfaceStructure = {
			path: ['fruit'],
			count: 7,
			refs: 0,
			isInArray: false,
			data: {}
		};

		addEnumerable(analysisResult, value, ['fruit'], parent, false);

		assert.equal(analysisResult, {
			enums: [{
				path: ['animals'],
				type: numberTypeWith([12, 17]),
				count: 3,
				refs: 1,
				isInArray: false
			}, {
				path: ['fruit'],
				type: {
					type: 'number',
					values: [1, 4, 8],
					valuesMap: { 1: true, 4: true, 8: true }
				},
				count: 5,
				refs: 7,
				isInArray: false
			}, {
				path: ['fruit'],
				type: {
					type: 'number',
					values: [2, 7, 199],
					valuesMap: { 2: true, 7: true, 199: true },
					index: 2
				},
				count: 7,
				refs: 1,
				isInArray: false
			}],
			tuples: [],
			interfaces: [],
			analysisDuration: 0
		});
		assert.equal(value, {
			type: 'number',
			values: [2, 7, 199],
			valuesMap: { 2: true, 7: true, 199: true },
			index: 2
		});
	});
});
