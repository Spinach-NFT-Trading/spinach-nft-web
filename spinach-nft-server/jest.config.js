/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@spinach/server(.*)$': '<rootDir>/src/$1',
    '^@spinach/common(.*)$': '<rootDir>/../spinach-nft-common/$1',
  },
};
