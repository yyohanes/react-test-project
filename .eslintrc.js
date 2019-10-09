module.exports = {
  extends: [
    'airbnb-typescript',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: './webpack.config.js',
      },
    },
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
  },
  globals: {
    __DEBUG__: true,
  },
  rules: {
    '@typescript-eslint/semi': 'off',
    'import/prefer-default-export': 'off',
    'react/no-array-index-key': 'off',
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'no-async-promise-executor': 'off',
    'max-len': ['error', 150],
  },
}
