module.exports = {
  testRegex: '((\\.|/*.)(test))\\.tsx?$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^app(.*)$': '<rootDir>/src$1',
    '.(s?css)$': 'identity-obj-proxy',
  },
  globals: {
    __DEBUG__: true,
  },
}
