import displayValue from 'display-value';
import { assert, it } from 'hippogriff';
import getShallowType from './getShallowType.js';

it('should handle null', () => {
	assert.equal(getShallowType(null), 'null');
});

it('should handle string', () => {
	assert.equal(getShallowType(''), 'string');
});

it('should handle true', () => {
	assert.equal(getShallowType(true), 'boolean');
});

it('should handle false', () => {
	assert.equal(getShallowType(false), 'boolean');
});

it('should handle 0', () => {
	assert.equal(getShallowType(0), 'number');
});

it('should handle 3.14159265358979', () => {
	assert.equal(getShallowType(3.14159265358979), 'number');
});

it('should handle Infinity', () => {
	assert.equal(getShallowType(Infinity), 'number');
});

[
	new Date(),
	/123./,
	new Map()
].forEach((value) => {
	it(`should handle ${ displayValue(value) }`, () => {
		assert.equal(getShallowType(value), 'null');
	});
});
