const RULES = {
	'unicorn/no-process-exit': 'off',
	'n/file-extension-in-import': 'off',
	'import/extensions': 'off',
	'import/no-unassigned-import': [
		'error',
		{
			allow: ['@fontsource/**', '**/*.css'],
		},
	],
};

const TS_RULES = {
	'@typescript-eslint/naming-convention': 'off',
	'@typescript-eslint/triple-slash-reference': 'off',
	'@typescript-eslint/no-explicit-any': 'off',
	// Copied from XO for TypeScript files.
	// https://github.com/xojs/xo/blob/a815db35d84b99709ac1f1de9d016d3b7d11e84a/lib/options-manager.js#L386
	'unicorn/import-style': 'off',
	'node/file-extension-in-import': 'off',
	'import/export': 'off',
	'import/default': 'off',
	'import/named': 'off',
};

module.exports = {
	root: true,
	ignorePatterns: ['src/i18n/i18n-*.ts'],
	env: {
		node: true,
		es2022: true,
	},
	parserOptions: {
		sourceType: 'module',
		project: 'tsconfig.json',
		ecmaFeatures: {
			jsx: true,
		},
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.cjs', '.mjs', '.jsx', '.ts', '.tsx'],
			},
		},
	},

	overrides: [
		{
			files: ['*.astro'],
			extends: [
				'xo',
				'xo-typescript',
				'./node_modules/xo/config/plugins.cjs',
				'plugin:astro/recommended',
				'plugin:prettier/recommended',
			],
			parser: 'astro-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
				extraFileExtensions: ['.astro'],
			},
			rules: {
				...RULES,
				...TS_RULES,
				'@typescript-eslint/naming-convention': 'off',
			},
		},
		{
			files: ['*.ts'],
			extends: [
				'xo',
				'xo-typescript',
				'./node_modules/xo/config/plugins.cjs',
				'plugin:prettier/recommended',
			],
			parser: '@typescript-eslint/parser',
			rules: {
				...RULES,
				...TS_RULES,
			},
		},
		{
			files: ['*.tsx'],
			extends: [
				'xo',
				'xo-typescript',
				'./node_modules/xo/config/plugins.cjs',
				'plugin:solid/recommended',
				'plugin:prettier/recommended',
			],
			parser: '@typescript-eslint/parser',
			rules: {
				...RULES,
				...TS_RULES,
			},
		},
		{
			files: ['*.cjs', '*.mjs', '*.js', '*.jsx'],
			extends: ['xo', './node_modules/xo/config/plugins.cjs', 'plugin:prettier/recommended'],
			rules: {
				...RULES,
			},
		},
	],
};
