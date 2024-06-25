import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/out/'],
  modulePathIgnorePatterns: ['/out/'],
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true }],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // This tells Jest to look for .ts files instead of .js
    '^vscode$': '<rootDir>/src/test/__mocks__/vscode.ts', // Mock vscode module
  },
  transformIgnorePatterns: ['/node_modules/(?!vscode)'],
};

export default config;
