import pascalCaseWithAcronyms from '../utility/pascalCaseWithAcronyms.js';

const getNewTypeName = (
	path: Array<string>,
	existingNames: Array<string>,
	prefix: string,
	suffix: string
): string => {
	const buildName = (value: string): string => `${ prefix }${ pascalCaseWithAcronyms(value) }${ suffix }`;

	let pathIndex = path.length - 1;
	let baseName = path[pathIndex];
	let newName = buildName(baseName);
	let count = 1;

	while (existingNames.includes(newName)) {
		if (pathIndex > 0) {
			baseName = `${ path[--pathIndex] } ${ baseName }`;
			newName = buildName(baseName);
		}
		else {
			newName = buildName(baseName + (++count));
		}
	}

	return newName;
};

export default getNewTypeName;
