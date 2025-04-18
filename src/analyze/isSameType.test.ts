import displayValue from 'display-value';
import { assert, it } from 'hippogriff';
import { differentTypes, unionTypes } from '../testTypes.js';
import isSameType from './isSameType.js';

differentTypes.forEach((a, aIndex) => {
	differentTypes.forEach((b, bIndex) => {
		if (aIndex === bIndex) {
			it(`should return true for ${ displayValue(a) }`, () => {
				assert.is(isSameType(a, b), true);
			});
		}
		else {
			it(`should return false for ${ displayValue(a) } and ${ displayValue(b) }`, () => {
				assert.is(isSameType(a, b), false);
			});
		}
	});
});

unionTypes.forEach((a, aIndex) => {
	unionTypes.forEach((b, bIndex) => {
		if (aIndex === bIndex) {
			it(`should return true for ${ displayValue(a) }`, () => {
				assert.is(isSameType(a, b), true);
			});
		}
		else {
			it(`should return false for ${ displayValue(a) } and ${ displayValue(b) }`, () => {
				assert.is(isSameType(a, b), false);
			});
		}
	});
});
