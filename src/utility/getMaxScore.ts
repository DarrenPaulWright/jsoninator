interface IMaxScore {
	score: number;
	index: number;
}

const getMaxScore = <T>(
	items: Array<T>,
	callback: (item: T, index: number) => number
): IMaxScore => {
	const max: IMaxScore = {
		score: 0,
		index: -1
	};

	items.some((item, index) => {
		const score = callback(item, index);

		if (score > max.score) {
			max.score = score;
			max.index = index;
		}

		return score > 0.999;
	});

	return max;
};

export default getMaxScore;
