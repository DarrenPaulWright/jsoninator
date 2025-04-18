import { assert, it } from 'hippogriff';
import defaultOptions from '../defaultOptions.js';
import type { IRenderData } from '../models/render.models.js';
import type { INumberType, IStringType } from '../models/types.models.js';
import { numberType, stringType, testRenderer } from '../testTypes.js';
import getStatsComment from './getStatsComment.js';

it('should return an empty string if showStats is false', () => {
	const data: IRenderData['enums'][0] = {
		type: numberType as INumberType,
		path: [],
		name: '',
		count: 13,
		refs: 7,
		isInArray: false,
		renderRoot: true
	};

	const renderData: IRenderData = {
		enums: [],
		tuples: [],
		interfaces: [],
		renderer: testRenderer,
		options: {
			...defaultOptions,
			showStats: false
		},
		analysisDuration: 123
	};

	const result = getStatsComment(data, renderData);

	assert.is(result, '');
});

it('should handle a number', () => {
	const data: IRenderData['enums'][0] = {
		type: numberType as INumberType,
		path: [],
		name: '',
		count: 13,
		refs: 7,
		isInArray: false,
		renderRoot: true
	};

	const renderData: IRenderData = {
		enums: [],
		tuples: [],
		interfaces: [],
		renderer: testRenderer,
		options: {
			...defaultOptions,
			showStats: true
		},
		analysisDuration: 123
	};

	const result = getStatsComment(data, renderData);

	// eslint-disable-next-line no-console
	console.log('result:', result);

	assert.is(result, '// 13 json instances, 7 references\n');
});

it('should handle a string', () => {
	const data: IRenderData['enums'][0] = {
		type: stringType as IStringType,
		path: [],
		name: '',
		count: 21,
		refs: 3,
		isInArray: false,
		renderRoot: true
	};

	const renderData: IRenderData = {
		enums: [],
		tuples: [],
		interfaces: [],
		renderer: testRenderer,
		options: {
			...defaultOptions,
			showStats: true
		},
		analysisDuration: 123
	};

	const result = getStatsComment(data, renderData);

	assert.is(result, '// 21 json instances, 3 references\n');
});
