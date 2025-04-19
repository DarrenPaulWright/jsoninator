import { assert, it } from 'hippogriff';
import type { IInterfaceObject } from '../models/types.models.js';
import {
	booleanType,
	interfaceMainType,
	numberType,
	numberTypeWith,
	stringType
} from '../testTypes.js';
import mergeObject from './mergeObject.js';

it('should merge two objects', () => {
	const parent: IInterfaceObject = {
		apple: {
			type: 'union',
			types: [stringType],
			optional: false
		},
		banana: {
			type: 'union',
			types: [interfaceMainType],
			optional: false
		},
		pear: {
			type: 'union',
			types: [stringType, numberType],
			optional: true
		},
		orange: {
			type: 'union',
			types: [{
				type: 'number',
				values: [1, 2, 3],
				valuesMap: { 1: true, 2: true, 3: true }
			}],
			optional: false
		},
		grape: {
			type: 'union',
			types: [{
				type: 'string',
				values: ['red', 'purple'],
				valuesMap: { red: true, purple: true }
			}],
			optional: false
		},
		pineapple: {
			type: 'union',
			types: [],
			optional: true
		},
		plum: {
			type: 'union',
			types: [numberTypeWith([1, 2, 3])],
			optional: false
		}
	};

	const child: IInterfaceObject = {
		banana: {
			type: 'union',
			types: [interfaceMainType],
			optional: false
		},
		pear: {
			type: 'union',
			types: [numberType, booleanType],
			optional: false
		},
		kiwi: {
			type: 'union',
			types: [stringType],
			optional: false
		},
		orange: {
			type: 'union',
			types: [{
				type: 'number',
				values: [4],
				valuesMap: { 4: true }
			}],
			optional: false
		},
		grape: {
			type: 'union',
			types: [{
				type: 'string',
				values: ['green', 'purple'],
				valuesMap: { green: true, purple: true }
			}],
			optional: false
		},
		pineapple: {
			type: 'union',
			types: [numberTypeWith([1, 2, 3])],
			optional: false
		},
		plum: {
			type: 'union',
			types: [],
			optional: true
		}
	};

	mergeObject(parent, child);

	assert.equal(parent, {
		apple: {
			type: 'union',
			types: [stringType],
			optional: true
		},
		banana: {
			type: 'union',
			types: [interfaceMainType],
			optional: false
		},
		pear: {
			type: 'union',
			types: [stringType, numberType, booleanType],
			optional: true
		},
		orange: {
			type: 'union',
			types: [{
				type: 'number',
				values: [1, 2, 3, 4],
				valuesMap: { 1: true, 2: true, 3: true, 4: true }
			}],
			optional: false
		},
		grape: {
			type: 'union',
			types: [{
				type: 'string',
				values: ['red', 'purple', 'green'],
				valuesMap: { red: true, purple: true, green: true }
			}],
			optional: false
		},
		pineapple: {
			type: 'union',
			types: [numberTypeWith([1, 2, 3])],
			optional: true
		},
		plum: {
			type: 'union',
			types: [numberTypeWith([1, 2, 3])],
			optional: true
		},
		kiwi: {
			type: 'union',
			types: [stringType],
			optional: true
		}
	});
});
