import type { IRenderer } from '../../models/render.models.js';
import isAlpha from '../../utility/isAlpha.js';
import pascalCaseWithAcronyms from '../../utility/pascalCaseWithAcronyms.js';

const renderTypescript: IRenderer = {
	interfaceStartLine: (name, isRootLevel) => {
		return isRootLevel ?
			`interface ${ name } {` :
			'{';
	},
	interfaceEndLine: () => '}',
	interfaceKey: (name, isOptional) => {
		return `${ name }${ isOptional ? '?' : '' }: `;
	},
	union: (items) => items.join(' | '),
	unionStrings: (items) => items.map((value) => `'${ value }'`).join(' | '),
	unionNumbers: (items) => items.join(' | '),
	enum: (name, values) => {
		return `enum ${ name } {\n${
			values.map((value, index) => {
					const key = pascalCaseWithAcronyms(
						isAlpha(value.charAt(0)) ? value : `${ name } ${ value }`
					);

					const comma = index === values.length - 1 ? '' : ',';

					return `\t${ key } = '${ value }'${ comma }\n`;
				})
				.join('')
		}}`;
	},
	comment: (comment) => {
		return comment.includes('\n') ?
			`/*\n${ comment }\n*/` :
			`// ${ comment }`;
	}
};

export default renderTypescript;
