import { assert, it } from 'hippogriff';
import pascalCaseWithAcronyms from './pascalCaseWithAcronyms.js';

it('should convert single word to pascal case', () => {
	const result = pascalCaseWithAcronyms('apples');

	assert.is(result, 'Apples');
});

it('should convert two words to pascal case', () => {
	const result = pascalCaseWithAcronyms('apples bananas');

	assert.is(result, 'ApplesBananas');
});

it('should retain acronyms', () => {
	const result = pascalCaseWithAcronyms('apples bananasDTO');

	assert.is(result, 'ApplesBananasDTO');
});
