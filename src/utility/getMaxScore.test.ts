import { assert, it } from 'hippogriff';
import getMaxScore from './getMaxScore.js';

it('should get the max score', () => {
	const result = getMaxScore([0, 0.2, 0.4, 0.3, 0.1], (score) => score);

	assert.equal(result, { score: 0.4, index: 2 });
});

it('should stop if 1 is returned', () => {
	let count = 0;
	getMaxScore([0, 0.2, 1, 0.3, 0.1], (score) => {
		count++;

		return score;
	});

	assert.is(count, 3);
});
