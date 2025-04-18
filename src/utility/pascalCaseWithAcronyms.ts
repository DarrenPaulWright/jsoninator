import { split } from 'change-case';

const pascalCaseWithAcronyms = (value: string): string => {
	return split(value)
		.map((word) => {
			return word.toUpperCase() === word ?
				word :
				(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
		})
		.join('');
};

export default pascalCaseWithAcronyms;
