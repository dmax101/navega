module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@navega/shared-auth(.*)$": "<rootDir>/src/libs/shared-auth$1",
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.spec.json",
      stringifyContentPathRegex: "\\.html$",
    },
  },
  testMatch: ["**/+(*.)+(spec).+(ts)"],
  collectCoverage: true,
  coverageDirectory: "coverage",
};
