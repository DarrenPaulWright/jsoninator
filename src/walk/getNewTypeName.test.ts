import { assert, it } from 'hippogriff';
import getNewTypeName from './getNewTypeName.js';

it('should convert to Pascal case and add prefix amd suffix', () => {
	const result = getNewTypeName(['apple'], [], 'I', 'DTO');

	assert.is(result, 'IAppleDTO');
});

it('should make a unique name', () => {
	const result = getNewTypeName(['fruit', 'apple'], [
		'IAppleDTO'
	], 'I', 'DTO');

	assert.is(result, 'IFruitAppleDTO');
});

it('should append a number', () => {
	const result = getNewTypeName(['fruit', 'apple'], [
		'IAppleDTO',
		'IFruitAppleDTO'
	], 'I', 'DTO');

	assert.is(result, 'IFruitApple2DTO');
});
