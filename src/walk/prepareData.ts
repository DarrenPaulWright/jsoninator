import type { IAllOptions } from '../models/options.models.js';
import type { IInterfaceStructureRender, IRenderData } from '../models/render.models.js';
import type { IAnalysisResult } from '../models/types.models.js';
import getNewTypeName from './getNewTypeName.js';
import languageMap from './languages/languageMap.js';

const canRenderRoot = (
	item: IAnalysisResult['enums'][0] | IAnalysisResult['tuples'][0] | IAnalysisResult['interfaces'][0],
	options: IAllOptions
): boolean => {
	return options.inline === 'none' ||
		(options.inline === 'singleRef' && item.refs !== 1) ||
		(
			options.inline === 'singleRefNotInArray' &&
			(item.refs !== 1 || item.isInArray)
		);
};

const prepareData = (
	analysisResult: IAnalysisResult,
	options: IAllOptions
): IRenderData => {
	const allNames: Array<string> = [];
	const data: IRenderData = {
		enums: analysisResult.enums.map((enumData) => {
			return {
				...enumData,
				name: '',
				renderRoot: canRenderRoot(enumData, options) ||
					(options.preferEnumsOverUnions && enumData.type.type === 'string')
			};
		}),
		tuples: analysisResult.tuples.map((tupleData) => {
			return {
				...tupleData,
				name: '',
				renderRoot: canRenderRoot(tupleData, options) &&
					!options.preferArraysOverTuples
			};
		}),
		interfaces: analysisResult.interfaces
			.map((interfaceData) => {
				const interfaceRender: IInterfaceStructureRender = {
					...interfaceData,
					name: '',
					renderRoot: true
				};

				return interfaceRender;
			}),
		renderer: languageMap[options.outputLanguage],
		options,
		analysisDuration: analysisResult.analysisDuration
	};

	data.enums.forEach((item) => {
		if (item.renderRoot) {
			item.name = getNewTypeName(
				item.path,
				allNames,
				options.typePrefix,
				options.typeSuffix
			);

			allNames.push(item.name);
		}
	});

	allNames.length = 0;

	data.tuples.forEach((item) => {
		if (item.renderRoot) {
			item.name = getNewTypeName(
				item.path,
				allNames,
				options.typePrefix,
				options.typeSuffix
			);

			allNames.push(item.name);
		}
	});

	allNames.length = 0;

	data.interfaces.forEach((interfaceData, interfaceIndex) => {
		const hasValues = Object.keys(interfaceData.data).length !== 0;

		interfaceData.renderRoot = hasValues &&
			(
				interfaceIndex === data.interfaces.length - 1 ||
				canRenderRoot(interfaceData, options)
			);

		if (interfaceData.renderRoot) {
			interfaceData.name = getNewTypeName(
				interfaceData.path,
				allNames,
				options.interfacePrefix,
				options.interfaceSuffix
			);

			allNames.push(interfaceData.name);
		}
	});

	return data;
};

export default prepareData;
