const validCodes: { [code: number]: true } = {};

// numeric (0-9)
for (let index = 48; index < 58; index++) {
	validCodes[index] = true;
}

// upper alpha (A-Z)
for (let index = 65; index < 91; index++) {
	validCodes[index] = true;
}

// lower alpha (a-z)
for (let index = 97; index < 123; index++) {
	validCodes[index] = true;
}

/*
32 = space
45 = dash
95 = underscore
 */
const isAlphaNumeric = (value: string, additionalCodes: Array<number> = [32, 45, 95]): boolean => {
	for (let index = 0; index < value.length; index++) {
		const codePoint = value.codePointAt(index) || 0;

		if (!validCodes[codePoint] && !additionalCodes.includes(codePoint)) {
			return false;
		}
	}

	return true;
};

export default isAlphaNumeric;
