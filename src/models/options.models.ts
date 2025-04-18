import type languageMap from '../walk/languages/languageMap.js';

export interface IOptions {
	outputLanguage?: keyof typeof languageMap;
	showStats?: boolean;

	interfacePrefix?: string;
	interfaceSuffix?: string;
	typePrefix?: string;
	typeSuffix?: string;

	sortKeys?: boolean;
	sortOptionalLast?: boolean;

	inline?: 'none' | 'singleRef' | 'singleRefNotInArray' | 'all';
	preferEnumsOverUnions?: boolean;
	preferArraysOverTuples?: boolean;
	allPropertiesOptional?: boolean;
}

export type IAllOptions = Required<IOptions>;
