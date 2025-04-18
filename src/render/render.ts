import type { IAllOptions } from '../models/options.models.js';
import type { IInterfaceStructureRender, IRenderData } from '../models/render.models.js';
import type { IAnalysisResult, IType, IUnionType } from '../models/types.models.js';
import { sortEntriesLast, sortEntryKeys, sortTypes } from '../utility/sorters.js';
import walk from '../walk/walk.js';
import getStatsComment from './getStatsComment.js';

const renderTypeValue = (
	data: IRenderData,
	property: string,
	value: IType | IUnionType,
	level = 0
): string => {
	switch (value.type) {
		case 'array': {
			return value.types.length === 0 ?
				'Array<unknown>' :
				`Array<${ value.types
					.map((item) => renderTypeValue(data, property, item, level))
					.join(' | ') }>`;
		}

		case 'tuple': {
			if ('index' in value && data.tuples[value.index].renderRoot) {
				return data.tuples[value.index].name;
			}

			return `[${ value.types
				.map((item) => renderTypeValue(data, property, item, level))
				.join(', ') }]`;
		}

		case 'union': {
			return value.types
				.sort(sortTypes)
				.map((item) => renderTypeValue(data, property, item, level + 1))
				.join(' | ');
		}

		case 'interface': {
			if (data.interfaces[value.index].renderRoot) {
				return data.interfaces[value.index].name;
			}

			// eslint-disable-next-line @typescript-eslint/no-use-before-define
			return renderInterface(
				data.interfaces[value.index],
				data,
				level
			);
		}

		case 'string': {
			if ('index' in value) {
				return data.enums[value.index].renderRoot ?
					data.enums[value.index].name :
					data.renderer.unionStrings(
						data.enums[value.index].type.values.values() as Array<string>
					);
			}

			return value.type;
		}

		case 'number': {
			if ('index' in value) {
				return data.enums[value.index].renderRoot ?
					data.enums[value.index].name :
					data.renderer.unionNumbers(
						data.enums[value.index].type.values.values() as Array<number>
					);
			}

			return value.type;
		}

		default: {
			return value.type;
		}
	}
};

const renderInterface = (
	interfaceData: IInterfaceStructureRender,
	data: IRenderData,
	level = 0
): string => {
	const entries = Object.entries(interfaceData.data);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const optionalKeys = entries.filter(([_x, union]) => {
			return data.options.allPropertiesOptional || union.optional;
		})
		.map(([key]) => key);

	if (data.options.sortKeys) {
		entries.sort(sortEntryKeys);
	}

	if (data.options.sortOptionalLast) {
		entries.sort(sortEntriesLast(optionalKeys));
	}

	let output = `${
		level === 0 ?
			getStatsComment(interfaceData, data) :
			''
	}${
		data.renderer.interfaceStartLine(interfaceData.name, level === 0)
	}`;

	entries.forEach(([key, union]) => {
		output += '\n';
		output += '\t'.repeat(level + 1);
		output += data.renderer.interfaceKey(
			key,
			data.options.allPropertiesOptional || union.optional
		);
		output += renderTypeValue(data, key, union, level);
		output += ';';
	});

	if (entries.length !== 0) {
		output += `\n${ '\t'.repeat(level) }`;
	}

	output += data.renderer.interfaceEndLine();

	return output;
};

const getCount = (
	values: IRenderData['enums'] | IRenderData['tuples'] | IRenderData['interfaces'],
	key: 'count' | 'refs'
): string => {
	return values.reduce<number>((result, value) => {
			return result + value[key];
		}, 0)
		.toLocaleString();
};

const render = (analysisResult: IAnalysisResult, options: IAllOptions): string => {
	const start = Date.now();
	// eslint-disable-next-line @typescript-eslint/init-declarations
	let preparedData!: IRenderData;
	let output = '';

	walk(analysisResult, (itemType, value, data): void => {
		preparedData ||= data;

		switch (itemType) {
			case 'enum': {
				const item = value as IRenderData['enums'][0];

				if (item.renderRoot) {
					output += '\n';
					output += getStatsComment(item, data);

					output += options.preferEnumsOverUnions && item.type.type === 'string' ?
						data.renderer.enum(item.name, item.type.values.values() as Array<string>) :
						`type ${ item.name } = ${
							item.type.type === 'string' ?
								data.renderer.unionStrings(
									item.type.values.values() as Array<string>
								) :
								data.renderer.unionNumbers(
									item.type.values.values() as Array<number>
								)
						};`;

					output += '\n';
				}

				break;
			}

			case 'tuple': {
				const item = value as IRenderData['tuples'][0];

				if (item.renderRoot) {
					output += '\n';
					output += getStatsComment(item, data);
					output += `type ${ item.name } = [${ item.type.types
						.map((asdf) => renderTypeValue(data, item.name, asdf))
						.join(', ') }]`;
					output += '\n';
				}

				break;
			}

			case 'interface': {
				const item = value as IRenderData['interfaces'][0];

				if (item.renderRoot) {
					output += '\n';
					output += renderInterface(item, data);

					output += '\n';
				}
			}
		}
	}, options);

	// data.enums.forEach((item) => {
	// 	if (item.renderRoot) {
	// 		output += '\n';
	// 		output += getStatsComment(item, data);
	//
	// 		output += options.preferEnumsOverUnions && item.type.type === 'string' ?
	// 			data.renderer.enum(item.name, item.type.values) :
	// 			`type ${ item.name } = ${
	// 				item.type.type === 'string' ?
	// 					data.renderer.unionStrings(item.type.values) :
	// 					data.renderer.unionNumbers(item.type.values)
	// 			};`;
	//
	// 		output += '\n';
	// 	}
	// });
	//
	// data.tuples.forEach((value) => {
	// 	if (value.renderRoot) {
	// 		output += '\n';
	// 		output += getStatsComment(value, data);
	// 		output += `type ${ value.name } = [${ value.type.types
	// 			.map((item) => renderTypeValue(data, value.name, item))
	// 			.join(', ') }]`;
	// 		output += '\n';
	// 	}
	// });
	//
	// data.interfaces.forEach((interfaceData) => {
	// 	if (interfaceData.renderRoot) {
	// 		output += '\n';
	// 		output += renderInterface(interfaceData, data);
	//
	// 		output += '\n';
	// 	}
	// });

	if (options.showStats) {
		let stats = 'Summary:';
		stats += `\n\tEnumerables: ${ preparedData.enums.length }`;
		stats += `\n\t\tjson instances: ${ getCount(preparedData.enums, 'count') }`;
		stats += `\n\t\trefs: ${ getCount(preparedData.enums, 'refs') }`;
		stats += `\n\tTuples: ${ preparedData.tuples.length }`;
		stats += `\n\t\tjson instances: ${ getCount(preparedData.tuples, 'count') }`;
		stats += `\n\t\trefs: ${ getCount(preparedData.tuples, 'refs') }`;
		stats += `\n\tInterfaces: ${ preparedData.interfaces.length }`;
		stats += `\n\t\tjson instances: ${ getCount(preparedData.interfaces, 'count') }`;
		stats += `\n\t\trefs: ${ getCount(preparedData.interfaces, 'refs') }`;
		stats += `\n\tAnalysis Duration: ${ preparedData.analysisDuration }ms`;
		stats += `\n\tRender Duration: ${ Date.now() - start }ms`;

		output += `\n${ preparedData.renderer.comment(stats) }`;
	}

	return output;
};

export default render;
