import type { IAnalysisResult, IInterfaceStructure, IType } from '../models/types.models.js';
import addEnumerable from './addEnumerable.js';
import addTuple from './addTuple.js';

const countReferences = (
	path: Array<string>,
	types: Array<IType>,
	analysisResult: IAnalysisResult,
	parent: IInterfaceStructure,
	isInArray = false
): void => {
	types.forEach((value) => {
		switch (value.type) {
			case 'interface': {
				analysisResult.interfaces[value.index].refs++;

				if (isInArray) {
					analysisResult.interfaces[value.index].isInArray = true;
				}

				break;
			}

			case 'array': {
				countReferences(path, value.types, analysisResult, parent, true);

				break;
			}

			case 'tuple': {
				addTuple(analysisResult, value, path, isInArray);

				countReferences(path, value.types, analysisResult, parent, true);

				break;
			}

			case 'string': {
				addEnumerable(analysisResult, value, path, parent, isInArray);

				break;
			}

			case 'number': {
				addEnumerable(analysisResult, value, path, parent, isInArray);

				break;
			}
		}
	});
};

export default countReferences;
