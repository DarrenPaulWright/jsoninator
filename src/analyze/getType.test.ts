import { assert, it } from 'hippogriff';
import { List } from 'hord';
import {
	booleanType,
	emptyAnalysisResult,
	nullType,
	numberTypeWith,
	stringTypeWith,
	unionNumberTypeWith,
	unionStringTypeWith
} from '../testTypes.js';
import getType from './getType.js';

it('should handle a string', async () => {
	const analysisResult = emptyAnalysisResult();
	const result = await getType('apple', analysisResult, ['main']);

	assert.equal(result, stringTypeWith(['apple']));
	assert.equal(analysisResult.enums, []);
	assert.equal(analysisResult.tuples, []);
	assert.equal(analysisResult.interfaces, []);
	assert.moreThan(analysisResult.analysisDuration, -1);
});

it('should handle a number', async () => {
	const analysisResult = emptyAnalysisResult();
	const result = await getType(23, analysisResult, ['main']);

	assert.equal(result, numberTypeWith([23]));
	assert.equal(analysisResult.enums, []);
	assert.equal(analysisResult.tuples, []);
	assert.equal(analysisResult.interfaces, []);
	assert.moreThan(analysisResult.analysisDuration, -1);
});

it('should handle a boolean', async () => {
	const analysisResult = emptyAnalysisResult();
	const result = await getType(true, analysisResult, ['main']);

	assert.equal(result, booleanType);
	assert.equal(analysisResult.enums, []);
	assert.equal(analysisResult.tuples, []);
	assert.equal(analysisResult.interfaces, []);
	assert.moreThan(analysisResult.analysisDuration, -1);
});

it('should handle a null', async () => {
	const analysisResult = emptyAnalysisResult();
	const result = await getType(null, analysisResult, ['main']);

	assert.equal(result, nullType);
	assert.equal(analysisResult.enums, []);
	assert.equal(analysisResult.tuples, []);
	assert.equal(analysisResult.interfaces, []);
	assert.moreThan(analysisResult.analysisDuration, -1);
});

it('should handle a Date', async () => {
	const analysisResult = emptyAnalysisResult();
	const result = await getType(new Date(), analysisResult, ['main']);

	assert.equal(result, nullType);
	assert.equal(analysisResult.enums, []);
	assert.equal(analysisResult.tuples, []);
	assert.equal(analysisResult.interfaces, []);
	assert.moreThan(analysisResult.analysisDuration, -1);
});

it('should handle an object', async () => {
	const analysisResult = emptyAnalysisResult();
	const result = await getType({
		apples: 3,
		bananas: 7,
		kiwis: 9,
		grapes: null
	}, analysisResult, ['fruit']);

	assert.equal(result, {
		type: 'interface',
		index: 0
	});
	assert.equal(analysisResult.enums, []);
	assert.equal(analysisResult.tuples, []);
	assert.equal(analysisResult.interfaces, [{
		path: ['fruit'],
		count: 1,
		refs: 0,
		isInArray: false,
		data: {
			apples: unionNumberTypeWith([3]),
			bananas: unionNumberTypeWith([7]),
			kiwis: unionNumberTypeWith([9]),
			grapes: {
				type: 'union',
				types: [],
				optional: true
			}
		}
	}]);
	assert.moreThan(analysisResult.analysisDuration, -1);
});

it('should handle a nested object', async () => {
	const analysisResult = emptyAnalysisResult();
	const result = await getType({
		apples: 3,
		bananas: 7,
		kiwis: 9,
		berries: {
			strawberries: 9,
			raspberries: 4
		}
	}, analysisResult, ['fruit']);

	assert.equal(result, {
		type: 'interface',
		index: 1
	});
	assert.equal(analysisResult.enums, []);
	assert.equal(analysisResult.tuples, []);
	assert.equal(analysisResult.interfaces, [{
		path: ['fruit', 'berries'],
		count: 1,
		refs: 1,
		isInArray: false,
		data: {
			strawberries: unionNumberTypeWith([9]),
			raspberries: unionNumberTypeWith([4])
		}
	}, {
		path: ['fruit'],
		count: 1,
		refs: 0,
		isInArray: false,
		data: {
			apples: unionNumberTypeWith([3]),
			bananas: unionNumberTypeWith([7]),
			kiwis: unionNumberTypeWith([9]),
			berries: {
				type: 'union',
				types: [{
					type: 'interface',
					index: 0
				}],
				optional: false
			}
		}
	}]);
	assert.moreThan(analysisResult.analysisDuration, -1);
});

it('should handle an indexable object', async () => {
	const analysisResult = emptyAnalysisResult();
	const result = await getType({
		BC01: { name: 'apple' },
		BC02: { name: 'apple' },
		BC03: { name: 'banana' },
		BC04: { name: 'orange' },
		BC05: { name: 'apple' },
		BC06: { name: 'kiwi' },
		BC07: { name: 'banana' },
		BC08: { name: 'banana' },
		BC09: { name: 'orange' },
		BC10: { name: 'apple' },
		BC11: { name: 'apple' },
		BC12: { name: 'orange' },
		BC13: { name: 'orange' },
		BC14: { name: 'apple' },
		BC15: { name: 'banana' },
		BC16: { name: 'apple' },
		BC17: { name: 'apple' },
		BC18: { name: 'orange' },
		BC19: { name: 'banana' },
		BC20: { name: 'apple' },
		BC21: { name: 'banana' },
		BC22: { name: 'apple' }
	}, analysisResult, ['fruit']);

	assert.equal(result, {
		type: 'interface',
		index: 1
	});
	assert.equal(analysisResult.enums, []);
	assert.equal(analysisResult.tuples, []);
	assert.equal(analysisResult.interfaces, [{
		path: ['fruit', 'BC01'],
		count: 22,
		refs: 1,
		isInArray: false,
		data: {
			name: unionStringTypeWith(['apple', 'banana', 'orange', 'kiwi'])
		}
	}, {
		path: ['fruit'],
		count: 1,
		refs: 0,
		isInArray: false,
		data: {
			'[key: string]': {
				type: 'union',
				types: [{
					type: 'interface',
					index: 0
				}],
				optional: false
			}
		}
	}]);
	assert.moreThan(analysisResult.analysisDuration, -1);
});

it('should handle an array of strings', async () => {
	const analysisResult = emptyAnalysisResult();
	const result = await getType(['apple', 'banana', 'kiwi'], analysisResult, ['fruit']);

	assert.equal(result, {
		type: 'array',
		count: 1,
		types: [{
			type: 'string',
			values: new List('apple', 'banana', 'kiwi')
		}]
	});
	assert.equal(analysisResult.enums, []);
	assert.equal(analysisResult.tuples, []);
	assert.equal(analysisResult.interfaces, []);
	assert.moreThan(analysisResult.analysisDuration, -1);
});

it('should handle an array of different types', async () => {
	const analysisResult = emptyAnalysisResult();
	const result = await getType([
		'apple',
		'banana',
		10,
		true,
		'apple',
		'banana',
		10,
		true,
		'apple',
		'banana',
		10,
		true
	], analysisResult, ['fruit']);

	assert.equal(result, {
		type: 'array',
		types: [
			stringTypeWith(['apple', 'banana']),
			numberTypeWith([10]),
			booleanType
		],
		count: 1
	});
	assert.equal(analysisResult.enums, []);
	assert.equal(analysisResult.tuples, []);
	assert.equal(analysisResult.interfaces, []);
	assert.moreThan(analysisResult.analysisDuration, -1);
});

it('should handle an array of objects', async () => {
	const analysisResult = emptyAnalysisResult();
	const result = await getType([{
		apples: 3,
		bananas: 7,
		kiwis: 9
	}, {
		apples: 3,
		bananas: 7,
		kiwis: 9,
		oranges: 1
	}, {
		apples: 3,
		bananas: 7,
		kiwis: 9
	}, {
		apples: 3,
		bananas: 7,
		kiwis: 9
	}, {
		apples: 3,
		bananas: 7,
		kiwis: 9
	}], analysisResult, ['fruit']);

	assert.equal(result, {
		type: 'array',
		types: [{
			type: 'interface',
			index: 0
		}],
		count: 1
	});
	assert.equal(analysisResult.enums, []);
	assert.equal(analysisResult.tuples, []);
	assert.equal(analysisResult.interfaces, [{
		path: ['fruit'],
		count: 5,
		refs: 0,
		isInArray: false,
		data: {
			apples: unionNumberTypeWith([3]),
			bananas: unionNumberTypeWith([7]),
			kiwis: unionNumberTypeWith([9]),
			oranges: {
				type: 'union',
				types: [numberTypeWith([1])],
				optional: true
			}
		}
	}]);
	assert.moreThan(analysisResult.analysisDuration, -1);
});

it('should reduce a single instance tuple to an array', async () => {
	const analysisResult = emptyAnalysisResult();
	const result = await getType([{
		apples: 3,
		bananas: 7,
		kiwis: 9
	}, {
		apples: 3,
		bananas: 7,
		kiwis: 9,
		oranges: 1
	}, {
		apples: 3,
		bananas: 7,
		kiwis: 9,
		stats: [1, 2, 3, 4]
	}, {
		apples: 3,
		bananas: 7,
		kiwis: 9
	}, {
		apples: 3,
		bananas: 7,
		kiwis: 9
	}], analysisResult, ['fruit']);

	assert.equal(result, {
		type: 'array',
		types: [{
			type: 'interface',
			index: 0
		}],
		count: 1
	});
	assert.equal(analysisResult.enums, []);
	assert.equal(analysisResult.tuples, []);
	assert.equal(analysisResult.interfaces, [{
		path: ['fruit'],
		count: 5,
		refs: 0,
		isInArray: false,
		data: {
			apples: unionNumberTypeWith([3]),
			bananas: unionNumberTypeWith([7]),
			kiwis: unionNumberTypeWith([9]),
			oranges: {
				type: 'union',
				types: [numberTypeWith([1])],
				optional: true
			},
			stats: {
				type: 'union',
				types: [{
					type: 'array',
					types: [numberTypeWith([1, 2, 3, 4])],
					count: 1
				}],
				optional: true
			}
		}
	}]);
	assert.moreThan(analysisResult.analysisDuration, -1);
});
