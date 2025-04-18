import { lucidNode } from 'eslint-config-lucid';
import lucidTypescriptConfig from 'eslint-config-lucid-typescript';

export default [
	{
		ignores: [
			'**/*.js',
			'**/*.d.ts'
		]
	},
	...lucidNode,
	...lucidTypescriptConfig,
	{
		files: ['**/*.ts'],
		rules: {
			'security/detect-non-literal-fs-filename': 'off',
			'@typescript-eslint/class-methods-use-this': 'warn',
			'promise/no-callback-in-promise': 'off'
		}
	}
];
