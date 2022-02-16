module.exports = {
  verbose: true,
  testRegex: 'test\\.js$',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/lib/', '/es/'],
  setupFiles: ['./test/setup.js'],
  watchPathIgnorePatterns: ['node_modules'],
}
