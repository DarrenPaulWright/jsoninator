import type { IAnalysisResult, ITupleType } from '../models/types.models.js';
import { isAllTypesIdentical } from './isSameType.js';

const addTuple = (
	analysisResult: IAnalysisResult,
	value: ITupleType,
	path: Array<string>,
	isInArray: boolean
): void => {
	const match = analysisResult.tuples.some((item, index) => {
		if (isAllTypesIdentical(item.type.types, value.types)) {
			value.index = index;
			item.count += value.count;
			item.refs++;
			item.isInArray ||= isInArray;

			return true;
		}

		return false;
	});

	if (!match) {
		analysisResult.tuples.push({
			path,
			type: value,
			count: value.count,
			refs: 1,
			isInArray
		});
		value.index = analysisResult.tuples.length - 1;
	}
};

export default addTuple;
