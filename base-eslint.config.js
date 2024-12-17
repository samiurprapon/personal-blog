import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
	{
		ignores: ['**/dist', '**/node_modules', '**/play'],
	},
	{
		extends: [
			js.configs.recommended,
			...tseslint.configs.recommended,
			prettierRecommended,
		],
		plugins: {
			prettier,
		},
		languageOptions: {
			ecmaVersion: 2020,
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		rules: {
			// Base TypeScript and general rules
			'@/semi': ['warn'],
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
				},
			],
			eqeqeq: 'error',
			quotes: ['warn', 'single'],
			'no-console': 'warn',
			'prefer-const': 'warn',
		},
	},
);
