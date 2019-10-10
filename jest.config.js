module.exports = {
  testRegex: '((\\.|/*.)(test))\\.tsx?$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^app(.*)$': '<rootDir>/src$1',
    '.(s?css)$': 'identity-obj-proxy',
  },
  setupFiles: [
    'dotenv/config',
  ],
  globals: {
    __DEBUG__: true,
  },
}
