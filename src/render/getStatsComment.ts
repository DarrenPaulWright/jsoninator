import type { IInterfaceStructureRender, IRenderData } from '../models/render.models.js';

const pluralize = (string: string, count: number): string => {
	return string + (count === 1 ? '' : 's');
};

const getStatsComment = (
	data: IInterfaceStructureRender | IRenderData['enums'][0] | IRenderData['tuples'][0],
	renderData: IRenderData
): string => {
	const count = data.count;
	const references = data.refs;

	return renderData.options.showStats ?
		`${ renderData.renderer.comment(
			`${ count } json ${ pluralize('instance', count) }, ${ references } ${ pluralize('reference', references) }`
		) }\n` :
		'';
};

export default getStatsComment;
