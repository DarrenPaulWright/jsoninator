import { assert, it } from 'hippogriff';
import type {
	IArrayType,
	IInterfaceStructure,
	IInterfaceType,
	ITupleType
} from '../models/types.models.js';
import {
	emptyAnalysisResult,
	numberTypeWith,
	stringTypeWith,
	unionNumberTypeWith
} from '../testTypes.js';
import countReferences from './countReferences.js';

it('should handle an interface', () => {
	const analysisResult = emptyAnalysisResult();
	analysisResult.interfaces = [{
		path: ['fruit'],
		count: 1,
		refs: 0,
		isInArray: false,
		data: {
			apples: unionNumberTypeWith([1, 5, 9]),
			bananas: unionNumberTypeWith([1, 5, 9])
		}
	}];
	const value: IInterfaceType = {
		type: 'interface',
		index: 0
	};

	const parent: IInterfaceStructure = {
		path: ['fruit'],
		count: 10,
		refs: 0,
		isInArray: false,
		data: {}
	};

	countReferences(['fruit'], [value], analysisResult, parent, false);

	assert.equal(analysisResult.enums, []);
	assert.equal(analysisResult.tuples, []);
	assert.equal(analysisResult.interfaces, [{
		path: ['fruit'],
		count: 1,
		refs: 1,
		isInArray: false,
		data: {
			apples: unionNumberTypeWith([1, 5, 9]),
			bananas: unionNumberTypeWith([1, 5, 9])
		}
	}]);
	assert.moreThan(analysisResult.analysisDuration, -1);
	assert.equal(value, {
		type: 'interface',
		index: 0
	});

	countReferences(['fruit'], [value], analysisResult, parent, true);

	assert.equal(analysisResult.enums, []);
	assert.equal(analysisResult.tuples, []);
	assert.equal(analysisResult.interfaces, [{
		path: ['fruit'],
		count: 1,
		refs: 2,
		isInArray: true,
		data: {
			apples: unionNumberTypeWith([1, 5, 9]),
			bananas: unionNumberTypeWith([1, 5, 9])
		}
	}]);
	assert.moreThan(analysisResult.analysisDuration, -1);
	assert.equal(value, {
		type: 'interface',
		index: 0
	});
});

it('should handle an array', () => {
	const analysisResult = emptyAnalysisResult();
	const value: IArrayType = {
		type: 'array',
		types: [
			stringTypeWith(['apples', 'bananas', 'kiwis']),
			numberTypeWith([1, 8, 3])
		],
		count: 3
	};

	const parent: IInterfaceStructure = {
		path: ['fruit'],
		count: 10,
		refs: 0,
		isInArray: false,
		data: {}
	};

	countReferences(['fruit'], [value], analysisResult, parent, false);

	assert.equal(analysisResult.enums, [{
		path: ['fruit'],
		type: {
			type: 'string',
			values: ['apples', 'bananas', 'kiwis'],
			valuesMap: { apples: true, bananas: true, kiwis: true },
			index: 0
		},
		count: 10,
		refs: 1,
		isInArray: true
	}, {
		path: ['fruit'],
		type: {
			type: 'number',
			values: [1, 3, 8],
			valuesMap: { 1: true, 3: true, 8: true },
			index: 1
		},
		count: 10,
		refs: 1,
		isInArray: true
	}]);
	assert.equal(analysisResult.tuples, []);
	assert.equal(analysisResult.interfaces, []);
	assert.moreThan(analysisResult.analysisDuration, -1);
	assert.equal(value, {
		type: 'array',
		types: [{
			...stringTypeWith(['apples', 'bananas', 'kiwis']),
			index: 0
		}, {
			...numberTypeWith([1, 3, 8]),
			index: 1
		}],
		count: 3
	});
});

it('should handle tuples', () => {
	const analysisResult = emptyAnalysisResult();
	const value: ITupleType = {
		type: 'tuple',
		types: [
			stringTypeWith(['apples', 'bananas', 'kiwis']),
			numberTypeWith([1, 8, 3])
		],
		count: 3
	};

	const parent: IInterfaceStructure = {
		path: ['fruit'],
		count: 10,
		refs: 0,
		isInArray: false,
		data: {}
	};

	countReferences(['fruit'], [value], analysisResult, parent, false);

	assert.equal(analysisResult.enums, [{
		path: ['fruit'],
		type: {
			type: 'string',
			values: ['apples', 'bananas', 'kiwis'],
			valuesMap: { apples: true, bananas: true, kiwis: true },
			index: 0
		},
		count: 10,
		refs: 1,
		isInArray: true
	}, {
		path: ['fruit'],
		type: {
			type: 'number',
			values: [1, 3, 8],
			valuesMap: { 1: true, 3: true, 8: true },
			index: 1
		},
		count: 10,
		refs: 1,
		isInArray: true
	}]);
	assert.equal(analysisResult.tuples, [{
		path: ['fruit'],
		type: {
			type: 'tuple',
			types: [{
				...stringTypeWith(['apples', 'bananas', 'kiwis']),
				index: 0
			}, {
				...numberTypeWith([1, 3, 8]),
				index: 1
			}],
			count: 3,
			index: 0
		},
		count: 3,
		refs: 1,
		isInArray: false
	}]);
	assert.equal(analysisResult.interfaces, []);
	assert.moreThan(analysisResult.analysisDuration, -1);
	assert.equal(value, {
		type: 'tuple',
		types: [{
			...stringTypeWith(['apples', 'bananas', 'kiwis']),
			index: 0
		}, {
			...numberTypeWith([1, 3, 8]),
			index: 1
		}],
		count: 3,
		index: 0
	});
});

it('should handle strings', () => {
	const analysisResult = emptyAnalysisResult();
	const value = stringTypeWith(['apples', 'kiwi', 'bananas']);
	const parent: IInterfaceStructure = {
		path: ['fruit'],
		count: 10,
		refs: 0,
		isInArray: false,
		data: {}
	};

	countReferences(['fruit'], [value], analysisResult, parent, false);

	assert.equal(analysisResult.enums, [{
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
	}]);
	assert.equal(analysisResult.tuples, []);
	assert.equal(analysisResult.interfaces, []);
	assert.moreThan(analysisResult.analysisDuration, -1);
	assert.equal(value, {
		type: 'string',
		values: ['apples', 'bananas', 'kiwi'],
		valuesMap: { apples: true, bananas: true, kiwi: true },
		index: 0
	});
});

it('should handle numbers', () => {
	const analysisResult = emptyAnalysisResult();
	const value = numberTypeWith([1, 5, 3, 9, 7]);
	const parent: IInterfaceStructure = {
		path: ['fruit'],
		count: 11,
		refs: 0,
		isInArray: false,
		data: {}
	};

	countReferences(['fruit'], [value], analysisResult, parent, false);

	assert.equal(analysisResult.enums, [{
		path: ['fruit'],
		type: {
			type: 'number',
			values: [1, 3, 5, 7, 9],
			valuesMap: { 1: true, 3: true, 5: true, 7: true, 9: true },
			index: 0
		},
		count: 11,
		refs: 1,
		isInArray: false
	}]);
	assert.equal(analysisResult.tuples, []);
	assert.equal(analysisResult.interfaces, []);
	assert.moreThan(analysisResult.analysisDuration, -1);
	assert.equal(value, {
		type: 'number',
		values: [1, 3, 5, 7, 9],
		valuesMap: { 1: true, 3: true, 5: true, 7: true, 9: true },
		index: 0
	});
});
