module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: [
    'react',
    'react-hooks',
    'jsx-a11y',
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'error',

    'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'no-shadow': 'off',

    'import/extensions': [
      'warn',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.js',
          '**/*.spec.js',
          '**/vite.config.js',
          '**/vite.config.cjs',
        ],
      },
    ],
    'import/no-unresolved': 'error',

    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],

    'no-underscore-dangle': ['error', { allow: ['__dirname', '__filename'] }],
  },
  settings: {
    react: {
      version: 'detect',
    },
'import/resolver': {
    alias: {
      map: [['@', './src']],
      extensions: ['.js', '.jsx'],
    },
    node: {
      extensions: ['.js', '.jsx'],
    },
  },
  },
};
