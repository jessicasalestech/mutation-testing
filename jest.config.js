module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.js', '!src/**/*.test.js'],
  coverageThreshold: {
    global: { lines: 100, statements: 100, functions: 100, branches: 100 },
  },
  // By default it runs only the "weak" suite (does not include *.solution.test.js).
  // With SOLUTION=1 the solution is included and the suite becomes "strong".
  testMatch:
    process.env.SOLUTION === '1'
      ? ['**/*.test.js']
      : ['**/*.test.js', '!**/*.solution.test.js'],
};