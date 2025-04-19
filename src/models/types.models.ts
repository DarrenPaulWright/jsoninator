export interface IInputObject {
	[key: string]: unknown;
}

export type PrimitiveTypes = 'number' | 'string' | 'boolean' | 'null';

export interface IStringType {
	type: 'string';
	values: Array<string>;
	valuesMap: { [value: string]: true };
	index?: number;
}

export interface INumberType {
	type: 'number';
	values: Array<number>;
	valuesMap: { [value: number]: true };
	index?: number;
}

type IEnumerableType = IStringType | INumberType;

interface INonEnumerableType {
	type: 'boolean' | 'null';
}

export interface IArrayType {
	type: 'array';
	types: Array<IType>;
	count: number;
}

export interface ITupleType {
	type: 'tuple';
	types: Array<IType>;
	count: number;
	index?: number;
}

export interface IUnionType {
	type: 'union';
	types: Array<IType>;
	optional: boolean;
}

export interface IInterfaceType {
	type: 'interface';
	index: number;
}

export type IType = IEnumerableType |
	INonEnumerableType |
	IInterfaceType |
	IArrayType |
	ITupleType;

export interface IInterfaceObject {
	[key: string]: IUnionType;
}

interface IAnalysisResultItemBase {
	path: Array<string>;
	count: number;
	refs: number;
	isInArray: boolean;
}

export interface IInterfaceStructure extends IAnalysisResultItemBase {
	data: IInterfaceObject;
}

export interface IAnalysisResult {
	enums: Array<IAnalysisResultItemBase & {
		type: INumberType | IStringType;
	}>;
	tuples: Array<IAnalysisResultItemBase & {
		type: ITupleType;
	}>;
	interfaces: Array<IInterfaceStructure>;
	analysisDuration: number;
}
