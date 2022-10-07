module.exports = {
  transform: {
    "\\.[jt]sx?$":  [ 'esbuild-jest', { 
        loaders: {
          '.spec.js': 'jsx',
          '.js': 'jsx'
        }
      }
    ]
  },
  testEnvironment: 'node',
  testPathIgnorePatterns: ["node_modules"],
  //testMatch: ["<rootDir>/test/*.@(spec|test).js"],
  watchPathIgnorePatterns: ['dist\\/'],
  passWithNoTests: true,
};