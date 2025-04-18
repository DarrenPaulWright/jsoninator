import type { IAllOptions } from './models/options.models.js';

const defaultOptions: IAllOptions = {
	outputLanguage: 'typescript',
	showStats: false,

	interfacePrefix: 'I',
	interfaceSuffix: '',
	typePrefix: '',
	typeSuffix: '',

	sortKeys: false,
	sortOptionalLast: true,

	inline: 'singleRefNotInArray',
	preferEnumsOverUnions: false,
	preferArraysOverTuples: false,
	allPropertiesOptional: false
};

export default defaultOptions;
