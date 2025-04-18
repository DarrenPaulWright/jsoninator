const validCodes: { [code: number]: true } = {};

// upper alpha (A-Z)
for (let index = 65; index < 91; index++) {
	validCodes[index] = true;
}

// lower alpha (a-z)
for (let index = 97; index < 123; index++) {
	validCodes[index] = true;
}

const isAlpha = (value: string): boolean => {
	for (let index = 0; index < value.length; index++) {
		const codePoint = value.codePointAt(index) || 0;

		if (!validCodes[codePoint]) {
			return false;
		}
	}

	return true;
};

export default isAlpha;
