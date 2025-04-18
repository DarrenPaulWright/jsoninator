import { assert, it } from 'hippogriff';
import type { IInterfaceObject } from '../models/types.models.js';
import { unionNumberType, unionStringType } from '../testTypes.js';
import scoreInterface from './scoreInterface.js';

it('should return 1 for a perfect match', () => {
	const parent: IInterfaceObject = {
		apple: unionStringType,
		banana: unionNumberType
	};

	const child: IInterfaceObject = {
		apple: unionStringType,
		banana: unionNumberType
	};

	const score = scoreInterface(parent, child, 'fruit', 'fruit');

	assert.moreThan(score, 0.99);
});

it('should return 1 for a perfect match minus an optional', () => {
	const parent: IInterfaceObject = {
		apple: unionStringType,
		banana: {
			...unionNumberType,
			optional: true
		}
	};

	const child: IInterfaceObject = {
		apple: unionStringType
	};

	const score = scoreInterface(parent, child, 'fruit', 'fruit');

	assert.moreThan(score, 0.99);
});

it('should return 0.3 if the name is the same but the interfaces don\'t overlap', () => {
	const parent: IInterfaceObject = {
		apple: unionStringType,
		banana: unionNumberType
	};

	const child: IInterfaceObject = {
		grape: unionStringType,
		kiwi: unionStringType
	};

	const score = scoreInterface(parent, child, 'fruit', 'fruit');

	assert.is(score, 0.3);
});

it('should return 0.7 if the interfaces match but names are different', () => {
	const parent: IInterfaceObject = {
		apple: unionStringType,
		banana: unionNumberType
	};

	const child: IInterfaceObject = {
		apple: unionStringType,
		banana: unionNumberType
	};

	const score = scoreInterface(parent, child, 'fruit', 'items');

	assert.moreThan(score, 0.699);
	assert.lessThan(score, 0.701);
});

it('should return 0.65 if the interfaces match half and names are the same', () => {
	const parent: IInterfaceObject = {
		apple: unionStringType,
		banana: unionNumberType,
		grape: unionNumberType,
		coconut: unionNumberType,
		orange: unionNumberType,
		kiwi: unionNumberType
	};

	const child: IInterfaceObject = {
		apple: unionStringType,
		banana: unionNumberType,
		grape: unionNumberType,
		dragonfruit: unionNumberType,
		pineapple: unionNumberType,
		mango: unionNumberType
	};

	const score = scoreInterface(parent, child, 'fruit', 'fruit');

	assert.moreThan(score, 0.649);
	assert.lessThan(score, 0.651);
});
