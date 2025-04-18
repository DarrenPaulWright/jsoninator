import isNumeric from './isNumeric.js';

const isYearLike = (value: string): boolean => {
	return value.length === 4 && isNumeric(value);
};

export default isYearLike;
