import { assert, it } from 'hippogriff';
import isAlpha from './isAlpha.js';

it('should return true if all chars are alpha', () => {
	const result = isAlpha('abcdefghijklmnopqrstuvwqwzABCDEFGHIJKLMNOPQRSTUVWXYZ');

	assert.is(result, true);
});

it('should return false if not if all chars are alpha', () => {
	const result = isAlpha('abcdefghijklmnopqrstuvwqwz0ABCDEFGHIJKLMNOPQRSTUVWXYZ');

	assert.is(result, false);
});
