import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

import js from '@eslint/js';
import unusedImports from 'eslint-plugin-unused-imports';
import jsxA11Y from 'eslint-plugin-jsx-a11y';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tailwindcss from 'eslint-plugin-tailwindcss';
// import importPlugin from 'eslint-plugin-import';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  {
    ignores: ['**/node_modules/', '**/next-env.d.ts', '**/*.config.mjs', '**/*.config.js'],
  },
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:jsx-a11y/recommended',
    'plugin:tailwindcss/recommended',
    'prettier',
    'plugin:import/recommended',
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'jsx-a11y': jsxA11Y,
      'unused-imports': unusedImports,
      tailwindcss,
      // import: importPlugin,
    },
    languageOptions: {
      // globals: {
      //   ...globals.browser,
      // },

      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        tsconfigRootDir: '.',
        project: ['./tsconfig.json'],
      },
    },
    rules: {
      'no-var': 'error',
      'sort-imports': 0,
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['off'],
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'error',

      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'object',
            'type',
            'index',
          ],

          pathGroups: [
            {
              pattern: '{react,react-dom/**}',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: '{[A-Z]*,**/[A-Z]*}',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: './*.{css,scss,sass,less}',
              group: 'index',
              position: 'after',
            },
          ],

          'newlines-between': 'always',
          pathGroupsExcludedImportTypes: ['builtin'],

          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      'unused-imports/no-unused-imports': 'error',

      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-custom-classname': 'warn',
      'tailwindcss/no-contradicting-classname': 'error',
    },
  },
];

export default eslintConfig;
