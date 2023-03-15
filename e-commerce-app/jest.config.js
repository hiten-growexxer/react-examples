module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!app/**/*.test.{js,jsx}',
    '!app/*/RbGenerated*/*.{js,jsx}',
    '!src/index.js',
    '!app/global-styles.js',
    '!app/*/*/Loadable.{js,jsx}',
  ],
  modulePathIgnorePatterns: ['stories'],
  transformIgnorePatterns: ['node_modules/(?!(.*antd/es)/)?(!axios)/'],
  coverageThreshold: {
    global: { statements: 90, branches: 90, functions: 90, lines: 90 },
  },
  moduleDirectories: ['node_modules', 'app'],
  setupFiles: ['raf/polyfill'],
  testRegex: 'tests/.*\\.test\\.js$',
  snapshotSerializers: [],
  testEnvironment: 'jsdom',
  moduleNameMapper: { '\\.(css|less)$': 'identity-obj-proxy' },
};
