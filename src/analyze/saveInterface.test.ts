import { assert, it } from 'hippogriff';
import type { IInterfaceObject, IInterfaceStructure } from '../models/types.models.js';
import { unionNumberType, unionStringType } from '../testTypes.js';
import saveInterface from './saveInterface.js';

it('should find a matching interface', () => {
	const interfaces: Array<IInterfaceStructure> = [{
		path: ['main'],
		count: 1,
		refs: 0,
		isInArray: false,
		data: {
			apple: unionStringType
		}
	}, {
		path: ['fruit'],
		count: 1,
		refs: 0,
		isInArray: false,
		data: {
			banana: unionStringType
		}
	}];

	const child: IInterfaceObject = {
		banana: unionStringType
	};

	const index = saveInterface(child, ['fruit'], interfaces);

	assert.is(index, 1);
	assert.equal(interfaces, [{
		path: ['main'],
		count: 1,
		refs: 0,
		isInArray: false,
		data: {
			apple: unionStringType
		}
	}, {
		path: ['fruit'],
		count: 2,
		refs: 0,
		isInArray: false,
		data: {
			banana: unionStringType
		}
	}]);
});

it('should find a similar interface and merge', () => {
	const interfaces: Array<IInterfaceStructure> = [{
		path: ['main'],
		count: 1,
		refs: 0,
		isInArray: false,
		data: {
			apple: unionStringType,
			kiwi: unionNumberType
		}
	}, {
		path: ['fruit'],
		count: 1,
		refs: 0,
		isInArray: false,
		data: {
			banana: unionStringType,
			orange: unionNumberType,
			grape: unionNumberType
		}
	}];

	const child: IInterfaceObject = {
		banana: unionStringType,
		orange: unionNumberType
	};

	const index = saveInterface(child, ['fruit'], interfaces);

	assert.is(index, 1);
	assert.equal(interfaces, [{
		path: ['main'],
		count: 1,
		refs: 0,
		isInArray: false,
		data: {
			apple: unionStringType,
			kiwi: unionNumberType
		}
	}, {
		path: ['fruit'],
		count: 2,
		refs: 0,
		isInArray: false,
		data: {
			banana: unionStringType,
			orange: unionNumberType,
			grape: {
				...unionNumberType,
				optional: true
			}
		}
	}]);
});

it('should return a new name if no matching interface', () => {
	const interfaces: Array<IInterfaceStructure> = [{
		path: ['main'],
		count: 1,
		refs: 0,
		isInArray: false,
		data: {
			apple: unionStringType,
			kiwi: unionNumberType
		}
	}, {
		path: ['fruit'],
		count: 1,
		refs: 0,
		isInArray: false,
		data: {
			banana: unionStringType,
			orange: unionNumberType,
			grape: unionNumberType
		}
	}];

	const child: IInterfaceObject = {
		strawberry: unionStringType,
		raspberry: unionNumberType
	};

	const index = saveInterface(child, ['otherFruit'], interfaces);

	assert.is(index, 2);
	assert.equal(interfaces, [{
		path: ['main'],
		count: 1,
		refs: 0,
		isInArray: false,
		data: {
			apple: unionStringType,
			kiwi: unionNumberType
		}
	}, {
		path: ['fruit'],
		count: 1,
		refs: 0,
		isInArray: false,
		data: {
			banana: unionStringType,
			orange: unionNumberType,
			grape: unionNumberType
		}
	}, {
		path: ['otherFruit'],
		count: 1,
		refs: 0,
		isInArray: false,
		data: {
			strawberry: unionStringType,
			raspberry: unionNumberType
		}
	}]);
});
