import type {
	IAnalysisResult,
	IInterfaceStructure,
	INumberType,
	IStringType
} from '../models/types.models.js';
import getMaxScore from '../utility/getMaxScore.js';
import { sortNumbers, sortStrings } from '../utility/sorters.js';
import isEnumerable from './isEnumerable.js';

const addEnumerable = (
	analysisResult: IAnalysisResult,
	value: IStringType | INumberType,
	path: Array<string>,
	parent: IInterfaceStructure,
	isInArray: boolean
): void => {
	const name = path[path.length - 1];

	if (
		(value.type === 'string' && isEnumerable.strings(value, name, parent.count)) ||
		(value.type === 'number' && isEnumerable.numbers(value, name, parent.count))
	) {
		const max = getMaxScore(analysisResult.enums, (item) => {
			if (item.type.type === value.type) {
				let score = item.path[item.path.length - 1] === name ? 0.3 : 0;
				const overlap = (item.type as IStringType).values
					.filter((subValue: string) => {
						return (value as IStringType).values.includes(subValue);
					}).length;

				score += (overlap / item.type.values.length) * 0.35;
				score += (overlap / value.values.length) * 0.35;

				return score;
			}

			return 0;
		});

		if (max.score > 0.6) {
			value.index = max.index;
			analysisResult.enums[max.index].count += parent.count;
			analysisResult.enums[max.index].refs++;
			analysisResult.enums[max.index].isInArray ||= isInArray;
		}
		else {
			// @ts-expect-error type
			value.values.sort(value.type === 'string' ? sortStrings : sortNumbers);

			analysisResult.enums.push({
				path,
				type: value,
				count: parent.count,
				refs: 1,
				isInArray
			});
			value.index = analysisResult.enums.length - 1;
		}
	}
};

export default addEnumerable;
