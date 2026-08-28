module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.js', '!src/**/*.test.js'],
  coverageThreshold: {
    global: { lines: 100, statements: 100, functions: 100, branches: 100 },
  },
  // Por padrão roda apenas a suíte "fraca" (não inclui *.solution.test.js).
  // Com SOLUTION=1 inclui a solução e a suíte passa a ser "forte".
  testMatch:
    process.env.SOLUTION === '1'
      ? ['**/*.test.js']
      : ['**/*.test.js', '!**/*.solution.test.js'],
};