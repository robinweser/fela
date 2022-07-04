module.exports = {
  verbose: true,
  testRegex: 'test\\.js$',
  resetMocks: true,
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/lib/', '/es/'],
  watchPathIgnorePatterns: ['node_modules'],
}
