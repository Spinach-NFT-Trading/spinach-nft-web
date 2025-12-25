import path from 'path';
import {fileURLToPath} from 'url';

import {FlatCompat} from '@eslint/eslintrc';
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import google from 'eslint-config-google';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tsEslint from 'typescript-eslint';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default tsEslint.config(
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**', '**/*.d.ts', '**/*.js'],
  },
  js.configs.recommended,
  {
    rules: Object.keys(google.rules).reduce((acc, key) => {
      if (key !== 'valid-jsdoc' && key !== 'require-jsdoc') {
        acc[key] = google.rules[key];
      }
      return acc;
    }, {}),
  },
  ...compat.extends('plugin:import/errors'),
  ...compat.extends('plugin:import/warnings'),
  ...compat.extends('plugin:import/typescript'),
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2022,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        NodeJS: 'readonly',
      },
      parser: tsEslint.parser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsEslint.plugin,
      'unused-imports': unusedImports,
      '@stylistic': stylistic,
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', {
        varsIgnorePattern: '^_+$',
        argsIgnorePattern: '^_+$',
        ignoreRestSiblings: true,
      }],
      'unused-imports/no-unused-imports': ['error'],

      'indent': 'off',
      '@stylistic/indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'max-len': ['error', {
        code: 120,
      }],
      'import/order': ['error', {
        'groups': ['builtin', 'external', 'internal'],
        'pathGroups': [{
          pattern: 'react',
          group: 'external',
          position: 'before',
        }],
        'pathGroupsExcludedImportTypes': ['react'],
        'newlines-between': 'always',
        'alphabetize': {
          order: 'asc',
          caseInsensitive: true,
        },
      }],
      'import/newline-after-import': ['error', {
        count: 2,
      }],
      'import/no-relative-packages': 'error',
      'import/no-unresolved': 'error',
      'object-curly-spacing': 'off',
      'no-restricted-imports': ['error', {
        'patterns': ['spinach-nft-*'],
      }],
      'padding-line-between-statements': [
        'error',
        {blankLine: 'always', prev: '*', next: 'cjs-export'},
        {blankLine: 'always', prev: '*', next: 'export'},
        {blankLine: 'always', prev: 'const', next: 'cjs-export'},
        {blankLine: 'always', prev: '*', next: 'export'},
      ],
      'new-cap': ['error', {
        'capIsNewExceptionPattern': '^Type\\.',
      }],

      '@stylistic/object-curly-spacing': ['error', 'never'],
      '@stylistic/semi': ['error'],
      '@stylistic/member-delimiter-style': ['error', {
        multiline: {
          delimiter: 'comma',
          requireLast: true,
        },
      }],
      '@stylistic/type-annotation-spacing': ['error', {
        before: true,
        after: true,
        overrides: {
          colon: {
            before: false,
            after: true,
          },
        },
      }],
      'space-in-parens': ['error', 'never'],
      'quote-props': ['error', 'consistent-as-needed', {
        keywords: false,
        unnecessary: true,
      }],
      '@stylistic/arrow-spacing': ['error', {
        before: true,
        after: true,
      }],
      '@stylistic/comma-dangle': ['error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
        tuples: 'always-multiline',
        enums: 'always-multiline',
        generics: 'ignore',
      }],
      '@stylistic/space-unary-ops': ['error', {
        words: true,
        nonwords: false,
      }],
      '@stylistic/space-infix-ops': ['error'],
      'no-trailing-spaces': 'error',
      'valid-jsdoc': 'off',
      'require-jsdoc': 'off',
    },
  },
  {
    files: ['**/*.config.{mjs,js,cjs}', 'eslint.config.mjs'],
    plugins: {
      '@stylistic': stylistic,
    },
    languageOptions: {
      parserOptions: {
        project: null,
      },
    },
    rules: {
      'indent': 'off',
      '@stylistic/indent': ['error', 2],
      'max-len': 'off',
      'import/no-unresolved': 'off',
    },
  },
);
