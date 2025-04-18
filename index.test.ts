import { assert, describe, it } from 'hippogriff';
import jsoninator from './index.js';

describe('jsoninator', () => {
	[
		'data',
		10,
		true,
		null,
		undefined,
		new Date()

	].forEach((value) => {
		it(`should ignore ${ value }`, async () => {
			assert.equal(await jsoninator('data'), '');
		});
	});

	it('should process a simple object', async () => {
		const data = {
			apples: 1,
			bananas: 2
		};

		assert.equal(await jsoninator(data), `
interface IMain {
	apples: number;
	bananas: number;
}
`);
	});

	it('should process a simple object in an array', async () => {
		const data = [{
			apples: 1,
			bananas: 2
		}];

		assert.equal(await jsoninator(data), `
interface IMain {
	apples: number;
	bananas: number;
}
`);
	});

	it('should sort keys', async () => {
		const data = [{
			apples: 1,
			pears: 3,
			bananas: 2
		}];

		assert.equal(await jsoninator(data, { sortKeys: true }), `
interface IMain {
	apples: number;
	bananas: number;
	pears: number;
}
`);
	});

	it('should sort optional last', async () => {
		const data = [{
			apples: 1,
			pears: 3,
			bananas: 2,
			oranges: 9,
			raspberries: 3
		}, {
			pears: 3,
			bananas: 2,
			oranges: 2,
			raspberries: 7
		}];

		assert.equal(await jsoninator(data, { sortOptionalLast: true }), `
interface IMain {
	pears: number;
	bananas: number;
	oranges: number;
	raspberries: number;
	apples?: number;
}
`);
	});

	it('should sort keys and sort optional last', async () => {
		const data = [{
			apples: 1,
			kiwis: 4,
			pears: 3,
			bananas: 2
		}, {
			pears: 3,
			bananas: 2,
			kiwis: true
		}];

		assert.equal(await jsoninator(data, {
			sortKeys: true,
			sortOptionalLast: true
		}), `
interface IMain {
	bananas: number;
	kiwis: boolean | number;
	pears: number;
	apples?: number;
}
`);
	});
});
