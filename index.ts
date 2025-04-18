import { superimpose } from 'object-agent';
import getType from './src/analyze/getType.js';
import defaultOptions from './src/defaultOptions.js';
import type { IAllOptions, IOptions } from './src/models/options.models.js';
import type { IAnalysisResult } from './src/models/types.models.js';
import type WalkCallback from './src/models/WalkCallback.model.js';
import render from './src/render/render.js';
import walk from './src/walk/walk.js';

const jsoninator = async (data: unknown, options: IOptions = {}): Promise<string> => {
	const analysisResults = await jsoninator.analyze(data);

	return jsoninator.render(analysisResults, options);
};

jsoninator.analyze = async (data: unknown): Promise<IAnalysisResult> => {
	const interfaces: IAnalysisResult = {
		enums: [],
		tuples: [],
		interfaces: [],
		analysisDuration: 0
	};

	await getType(data, interfaces, ['main']);

	return interfaces;
};

jsoninator.render = (
	analysisResult: IAnalysisResult,
	options: IOptions
): string => {
	return render(analysisResult, superimpose(defaultOptions, options) as IAllOptions);
};

jsoninator.walk = (
	analysisResult: IAnalysisResult,
	callback: WalkCallback,
	options: IOptions
): void => {
	walk(analysisResult, callback, superimpose(defaultOptions, options) as IAllOptions);
};

export default jsoninator;

export type * from './src/models/render.models.js';
