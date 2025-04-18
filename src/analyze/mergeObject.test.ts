import { assert, it } from 'hippogriff';
import { List } from 'hord';
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
				values: new List(1, 2, 3)
			}],
			optional: false
		},
		grape: {
			type: 'union',
			types: [{
				type: 'string',
				values: new List('red', 'purple')
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
				values: new List(4)
			}],
			optional: false
		},
		grape: {
			type: 'union',
			types: [{
				type: 'string',
				values: new List('green', 'purple')
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
				values: new List(1, 2, 3, 4)
			}],
			optional: false
		},
		grape: {
			type: 'union',
			types: [{
				type: 'string',
				values: new List('red', 'purple', 'green')
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
