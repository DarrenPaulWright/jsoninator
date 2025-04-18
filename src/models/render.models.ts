import type { IAllOptions } from './options.models.js';
import type {
	IAnalysisResult,
	IInterfaceStructure,
	INumberType,
	IStringType,
	ITupleType
} from './types.models.js';

export interface IRenderer {
	interfaceStartLine: (name: string, isRootLevel: boolean) => string;
	interfaceEndLine: () => string;
	interfaceKey: (name: string, isOptional: boolean) => string;
	union: (items: Array<string>) => string;
	unionStrings: (items: Array<string>) => string;
	unionNumbers: (items: Array<number>) => string;
	enum: (name: string, values: Array<string>) => string;
	comment: (comment: string) => string;
}

interface IRenderDataItemBase {
	path: Array<string>;
	name: string;
	count: number;
	refs: number;
	isInArray: boolean;
	renderRoot: boolean;
}

export type IInterfaceStructureRender = IInterfaceStructure & IRenderDataItemBase;

export interface IRenderData extends IAnalysisResult {
	enums: Array<IRenderDataItemBase & {
		type: INumberType | IStringType;
	}>;
	tuples: Array<IRenderDataItemBase & {
		type: ITupleType;
	}>;
	interfaces: Array<IInterfaceStructureRender>;
	renderer: IRenderer;
	options: IAllOptions;
}
