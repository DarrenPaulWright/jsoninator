import { assert, it } from 'hippogriff';
import { numberTypeWith } from '../testTypes.js';
import isAllValuesSame from './isAllValuesSame.js';

it('should return true if all values are the same', () => {
	const result = isAllValuesSame(
		numberTypeWith([0, 0.2, 0.4, 0.3, 0.1]),
		numberTypeWith([0, 0.2, 0.4, 0.3, 0.1])
	);

	assert.is(result, true);
});

it('should return false if arrays are different lengths', () => {
	const result = isAllValuesSame(
		numberTypeWith([0, 0.2, 0.4, 0.3]),
		numberTypeWith([0, 0.2, 0.4, 0.3, 0.1])
	);

	assert.is(result, false);
});

it('should return false if different values', () => {
	const result = isAllValuesSame(
		numberTypeWith([0, 0.2, 0.4, 0.3, 0.1]),
		numberTypeWith([0, 0.2, 0.45, 0.3, 0.1])
	);

	assert.is(result, false);
});
