import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import stylistic from '@stylistic/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import tailwind from 'eslint-plugin-better-tailwindcss';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tsEslint from 'typescript-eslint';


const config = tsEslint.config(
  ...nextTypescript,
  ...nextCoreWebVitals,
  {
    ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      '@stylistic': stylistic,
      'unused-imports': unusedImports,
      'better-tailwindcss': tailwind,
      'no-relative-import-paths': noRelativeImportPaths,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
      },
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/app/globals.css',
      },
    },
    rules: {
      ...tailwind.configs['recommended-error'].rules,
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
      'no-console': ['error', {
        allow: ['info', 'warn', 'error', 'debug'],
      }],
      'no-relative-import-paths/no-relative-import-paths': [
        'error',
        {
          allowSameFolder: false,
          rootDir: 'src',
          prefix: '@',
        },
      ],
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
      'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 0, maxBOF: 0 }],
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
      'react/prop-types': 'off',
      'react/jsx-tag-spacing': ['error', {
        beforeSelfClosing: 'never',
      }],
      'react-hooks/exhaustive-deps': 'off',
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
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'cjs-export' },
        { blankLine: 'always', prev: '*', next: 'export' },
        { blankLine: 'always', prev: 'const', next: 'cjs-export' },
        { blankLine: 'always', prev: '*', next: 'export' },
      ],
    },
  },
  {
    files: ['**/*.config.{mjs,js,cjs}', 'eslint.config.mjs'],
    languageOptions: {
      parserOptions: {
        project: null,
      },
    },
    rules: {
      'max-len': 'off',
      'import/no-unresolved': 'off',
    },
  },
);

export default config;
