import js from '@eslint/js'
import globals from 'globals'
import path from 'path'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettier from 'eslint-plugin-prettier'
import importPlugin from 'eslint-plugin-import'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import airbnb from 'eslint-config-airbnb'
import airbnbHooks from 'eslint-config-airbnb/hooks'
import reactRecommended from 'eslint-plugin-react/configs/recommended.js'
import jsxA11yRecommended from 'eslint-plugin-jsx-a11y/configs/recommended.js'
import prettierRecommended from 'eslint-plugin-prettier/recommended.js'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      prettier,
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        alias: {
          map: [['@', path.resolve('./src')]],
          extensions: ['.js', '.jsx'],
        },
      },
    },
    extends: [
      js.configs.recommended,
      airbnb,
      airbnbHooks,
      reactRecommended,
      jsxA11yRecommended,
      prettierRecommended,
      reactRefresh.configs.vite,
    ],
    rules: {
      // 기본 규칙
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react/react-in-jsx-scope': 'off',
      'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
      'import/prefer-default-export': 'off',
      'prettier/prettier': 'error',

      // 정렬 규칙
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after',
            },
          ],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
        },
      ],
    },
  },
])