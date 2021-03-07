module.exports = {
  displayName: `graphql-directives`,
  roots: ["<rootDir>/server"],
  coverageDirectory: `./.coverage/`,
  collectCoverage: false,
  coverageThreshold: {
    global: {
      functions: 80,
      branches: 80,
      lines: 80,
      statements: 80,
    },
  },
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  verbose: true,
  testTimeout: 15000,
};
