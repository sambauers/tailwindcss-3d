// @ts-check
/* eslint-disable no-undef */

/**
 * @type {import('@swc/core/types').Options}
 */
const swcConfig = {
  module: {
    type: 'commonjs',
  },
  jsc: {
    parser: {
      syntax: 'typescript',
    },
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
}

module.exports = jestConfig
