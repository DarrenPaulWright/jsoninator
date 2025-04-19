import type { IRenderer } from './models/render.models.js';
import type {
	IAnalysisResult,
	IArrayType,
	INumberType,
	IStringType,
	ITupleType,
	IType,
	IUnionType
} from './models/types.models.js';

export const stringType: IType = {
	type: 'string',
	values: [],
	valuesMap: {}
};

export const stringTypeWith = (values: Array<string>): IStringType => {
	return {
		type: 'string',
		values: [...values],
		valuesMap: values.reduce<IStringType['valuesMap']>((result, value) => {
			result[value] = true;

			return result;
		}, {})
	};
};

export const numberType: IType = {
	type: 'number',
	values: [],
	valuesMap: {}
};

export const numberTypeWith = (values: Array<number>): INumberType => {
	return {
		type: 'number',
		values: [...values],
		valuesMap: values.reduce<INumberType['valuesMap']>((result, value) => {
			result[value] = true;

			return result;
		}, {})
	};
};

export const booleanType: IType = {
	type: 'boolean'
};

export const nullType: IType = {
	type: 'null'
};

export const interfaceMainType: IType = {
	type: 'interface',
	index: 0
};

export const interfaceSubType: IType = {
	type: 'interface',
	index: 1
};

export const emptyArrayType: IArrayType = {
	type: 'array',
	types: [],
	count: 1
};

export const arrayStringType: IArrayType = {
	type: 'array',
	types: [stringType],
	count: 1
};

export const arrayInterfaceType: IArrayType = {
	type: 'array',
	types: [interfaceMainType],
	count: 1
};

export const arrayMixedType: IArrayType = {
	type: 'array',
	types: [interfaceMainType, interfaceSubType, stringType, nullType],
	count: 1
};

export const tupleStringType: ITupleType = {
	type: 'tuple',
	types: [stringType],
	count: 1
};

export const tupleInterfaceType: ITupleType = {
	type: 'tuple',
	types: [interfaceMainType],
	count: 1
};

export const tupleMixedType: ITupleType = {
	type: 'tuple',
	types: [interfaceMainType, interfaceSubType, stringType, nullType],
	count: 1
};

export const unionStringType: IUnionType = {
	type: 'union',
	types: [stringType],
	optional: false
};

export const unionStringTypeWith = (values: Array<string>): IUnionType => {
	return {
		type: 'union',
		types: [stringTypeWith(values)],
		optional: false
	};
};

export const unionNumberType: IUnionType = {
	type: 'union',
	types: [numberType],
	optional: false
};

export const unionNumberTypeWith = (values: Array<number>): IUnionType => {
	return {
		type: 'union',
		types: [numberTypeWith(values)],
		optional: false
	};
};

export const unionInterfaceType: IUnionType = {
	type: 'union',
	types: [interfaceMainType],
	optional: false
};

export const unionMixedType: IUnionType = {
	type: 'union',
	types: [interfaceMainType, interfaceSubType, stringType, nullType],
	optional: false
};

export const arrayTypes: Array<IArrayType> = [
	emptyArrayType,
	arrayStringType,
	arrayInterfaceType,
	arrayMixedType
];

export const tupleTypes: Array<ITupleType> = [
	tupleStringType,
	tupleInterfaceType,
	tupleMixedType
];

export const unionTypes: Array<IUnionType> = [
	unionStringType,
	unionNumberType,
	unionInterfaceType,
	unionMixedType
];

export const differentTypes: Array<IType> = [
	stringType,
	numberType,
	booleanType,
	nullType,
	interfaceMainType,
	interfaceSubType,
	...arrayTypes,
	...tupleTypes
];

export const emptyAnalysisResult = (analysisDuration = 0): IAnalysisResult => ({
	enums: [],
	tuples: [],
	interfaces: [],
	analysisDuration
});

export const testRenderer: IRenderer = {
	interfaceStartLine: (name) => name,
	interfaceEndLine: () => '',
	interfaceKey: (name) => name,
	union: (items) => items.join(', '),
	unionStrings: (items) => items.map((value) => `"${ value }"`)
		.join(', '),
	unionNumbers: (items) => items.join(', '),
	enum: (name: string, values) => `${ name } ${ values.join(', ') }`,
	comment: (comment) => `// ${ comment }`
};
