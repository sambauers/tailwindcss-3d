// @ts-check

/** @type {import('eslint').Linter.Config} */
const eslintConfig = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      },
    ],
    'prettier/prettier': 'error',
  },
}

// eslint-disable-next-line no-undef
module.exports = eslintConfig
