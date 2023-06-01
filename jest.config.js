module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['./jest.setup.js'],
  //? Had to add this because of the error with animate.css
  // moduleNameMapper: {
  //   '^animate.css$': '<rootDir>/mocks/animate.css.js',
  // },
  // //? Had to add this because of the error with query string
  // transformIgnorePatterns: ['/node_modules/(?!query-string)/'],
};