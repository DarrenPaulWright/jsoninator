import { assert, it } from 'hippogriff';
import isAlphaNumeric from './isAlphaNumeric.js';

it('should return true if all chars are alpha numeric', () => {
	const result = isAlphaNumeric('abcdefghijklmnopqrstuvwqwzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_- ');

	assert.is(result, true);
});

it('should return false if not if all chars are alpha', () => {
	const result = isAlphaNumeric('!');

	assert.is(result, false);
});

it('should return true if additionalCodes includes char', () => {
	const result = isAlphaNumeric('abcABC!', [33]);

	assert.is(result, true);
});
