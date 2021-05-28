module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint', 'prettier'],
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'react-app',
  ],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/prefer-stateless-function': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-one-expression-per-line': 0,
    '@typescript-eslint/no-explicit-any': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['**/*.test.tsx'],
      env: {
        jest: true,
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-unused-vars': 0,
        '@typescript-eslint/no-unused-vars': 0,
      },
    },
  ],
};
