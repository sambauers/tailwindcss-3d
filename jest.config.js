// @ts-check

/**
 * @type {import('@swc/core').Options}
 */
const swcConfig = {
  module: {
    type: 'commonjs',
  },
  jsc: {
    parser: {
      syntax: 'typescript',
    },
    baseUrl: '.',
    paths: {
      '@/*': ['./src/*'],
    },
  },
  envName: 'test',
  swcrc: false,
}

/**
 * @type {import('jest').Config}
 */
const jestConfig = {
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      // @ts-expect-error swc options are not assignable
      swcConfig,
    ],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  coveragePathIgnorePatterns: ['<rootDir>/jest'],
}

// eslint-disable-next-line no-undef
module.exports = jestConfig
