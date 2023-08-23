const RULES = {
	'unicorn/no-process-exit': 'off',
	'n/file-extension-in-import': 'off',
	'import/extensions': ['error', 'never', { pattern: { astro: 'always', css: 'always' } }],
	'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
	'import/no-duplicates': ['error', { 'prefer-inline': false }],
	'import/order': [
		'error',
		{
			groups: [
				'type',
				'builtin',
				'external',
				'internal',
				'parent',
				'sibling',
				'index',
				'object',
				'unknown',
			],
			pathGroups: [
				{ pattern: 'virtual:*', group: 'object', position: 'after' },
				{ pattern: '*.css', group: 'object', position: 'after' },
			],
			alphabetize: {
				order: 'asc',
			},
			'newlines-between': 'never',
			warnOnUnassignedImports: true,
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
	// 'import/export': 'off', -- This is fixed
	'import/default': 'off',
	'import/named': 'off',
	// End of copied rules.
};

module.exports = {
	root: true,
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
			typescript: true,
			node: true,
		},
		'import/extensions': ['.js', '.cjs', '.mjs', '.jsx', '.ts', '.tsx'],
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
	},

	overrides: [
		{
			files: ['*.astro'],
			extends: [
				'xo',
				'xo-typescript',
				'./node_modules/xo/config/plugins.cjs',
				'plugin:import/typescript',
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
				'new-cap': 'off',
			},
		},
		{
			files: ['*.ts'],
			extends: [
				'xo',
				'xo-typescript',
				'./node_modules/xo/config/plugins.cjs',
				'plugin:import/typescript',
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
				'plugin:import/typescript',
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
