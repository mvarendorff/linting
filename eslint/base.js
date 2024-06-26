const eslintJs = require('@eslint/js');
const importPlugin = require('eslint-plugin-import');
const globals = require('globals');
const ignores = require('./common/ignores');

/**
 * @type {import('eslint').Linter.FlatConfig}
 */
module.exports = {
  files: ['**/*.{ts,tsx,js,jsx}'],
  ignores,
  plugins: {import: importPlugin},
  // Fix for https://github.com/import-js/eslint-plugin-import/issues/2556
  settings: {
    'import/parsers': {
      espree: ['.js', '.cjs', '.mjs', '.jsx'],
    },
  },
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
    },
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  rules: {
    ...eslintJs.configs.recommended.rules,
    ...importPlugin.configs.recommended.rules,
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
        ],
        alphabetize: {order: 'asc', caseInsensitive: true},
      },
    ],
  },
};
