const isNumeric = (value: string): boolean => {
	for (let index = 0; index < value.length; index++) {
		const code = value.codePointAt(index) || 0;

		if (code < 48 || code > 57) { // numeric (0-9)
			return false;
		}
	}

	return true;
};

export default isNumeric;
