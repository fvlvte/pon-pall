module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    '@react-native-community'
  ],
  root: true,
  env: {
    node: true,
  },
  ignorePatterns: ['.eslintrc.js', 'node_modules/', 'src/api-client/'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    "react-hooks/exhaustive-deps": "off",
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [
          'public-field',
          'protected-field',
          'abstract-field',
          'private-field',
          'constructor',
          'public-method',
          'protected-method',
          'abstract-method',
          'private-method',
        ],
      },
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true,
      },
    ],
  },
};
