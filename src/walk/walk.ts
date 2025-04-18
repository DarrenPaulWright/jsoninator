import type { IAllOptions } from '../models/options.models.js';
import type { IAnalysisResult } from '../models/types.models.js';
import type WalkCallback from '../models/WalkCallback.model.js';
import prepareData from './prepareData.js';

const walk = (
	analysisResult: IAnalysisResult,
	walkCallback: WalkCallback,
	options: IAllOptions
): void => {
	const data = prepareData(analysisResult, options);

	data.enums.forEach((item) => {
		if (item.renderRoot) {
			walkCallback('enum', item, data);
		}
	});

	data.tuples.forEach((value) => {
		if (value.renderRoot) {
			walkCallback('tuple', value, data);
		}
	});

	data.interfaces.forEach((interfaceData) => {
		if (interfaceData.renderRoot) {
			walkCallback('interface', interfaceData, data);
		}
	});
};

export default walk;
