export const isAllValuesSame = <Type>(
	a: Array<Type>,
	b: Array<Type>
): boolean => {
	return a.length === b.length && a.every((aSub: Type) => b.includes(aSub));
};

export default isAllValuesSame;
