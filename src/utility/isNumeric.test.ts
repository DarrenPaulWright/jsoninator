import { assert, it } from 'hippogriff';
import isAlphaNumeric from './isAlphaNumeric.js';
import isNumeric from './isNumeric.js';

it('should return true if all chars are numeric', () => {
	const result = isNumeric('0123456789');

	assert.is(result, true);
});

it('should return false if not if all chars are numeric', () => {
	const result = isAlphaNumeric('865!');

	assert.is(result, false);
});
