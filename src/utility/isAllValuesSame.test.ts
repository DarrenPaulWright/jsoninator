import { assert, it } from 'hippogriff';
import { List } from 'hord';
import isAllValuesSame from './isAllValuesSame.js';

it('should return true if all values are the same', () => {
	const result = isAllValuesSame(
		new List(0, 0.2, 0.4, 0.3, 0.1),
		new List(0, 0.2, 0.4, 0.3, 0.1)
	);

	assert.is(result, true);
});

it('should return false if arrays are different lengths', () => {
	const result = isAllValuesSame(
		new List(0, 0.2, 0.4, 0.3),
		new List(0, 0.2, 0.4, 0.3, 0.1)
	);

	assert.is(result, false);
});

it('should return false if different values', () => {
	const result = isAllValuesSame(
		new List(0, 0.2, 0.4, 0.3, 0.1),
		new List(0, 0.2, 0.45, 0.3, 0.1)
	);

	assert.is(result, false);
});
