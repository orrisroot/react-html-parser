module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  plugins: ['prettier', 'import', 'react'],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/no-cycle': 'error',
    'node/no-unsupported-features/es-syntax': 'off',
    'prettier/prettier': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      settings: {
        node: {
          tryExtensions: ['.ts', '.json'],
        },
        'import/resolver': {
          node: {
            extensions: ['.ts', '.json'],
          },
        },
      },
      rules: {
        '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      },
    },
    {
      files: ['*.spec.js'],
      env: {
        jasmine: true,
      },
      plugins: ['jasmine'],
      extends: ['plugin:jasmine/recommended'],
      rules: {
        'import/no-unresolved': 'off',
        'jasmine/no-unsafe-spy': 'off',
      },
    },
    {
      files: ['demo/src/**/*.js'],
      rules: {
        'import/no-unresolved': 'off',
      },
    },
  ],
};
