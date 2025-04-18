import { assert, it } from 'hippogriff';
import isYearLike from './isYearLike.js';

it('should return true if all chars are numeric and length is 4', () => {
	const result = isYearLike('6789');

	assert.is(result, true);
});

it('should return false if not if all chars are numeric', () => {
	const result = isYearLike('865!');

	assert.is(result, false);
});

it('should return false if length is not 4', () => {
	const result = isYearLike('86512');

	assert.is(result, false);
});
