import castArray from 'lodash/castArray'
import every from 'lodash/every'
import isArray from 'lodash/isArray'
import isBoolean from 'lodash/isBoolean'
import isFunction from 'lodash/isFunction'
import over from 'lodash/over'
import some from 'lodash/some'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GuardTest = (arg: any) => boolean
type GuardTests = GuardTest | GuardTest[]
type GuardTestGroups = GuardTests[]

export const generateGuard = <T>(...testGroups: GuardTestGroups) => {
  if (testGroups.length < 1) {
    return (maybe?: unknown): maybe is T => false
  }

  return (maybe?: unknown): maybe is T =>
    some(testGroups, (tests) => {
      const safeTests = castArray(tests)

      if (safeTests.length < 1) {
        return false
      }

      return every(
        over<boolean>(...safeTests)(maybe),
        (result) => result === true,
      )
    })
}

export const isGuardTest = generateGuard<GuardTest>([
  isFunction,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (maybe: (...args: any[]) => any) =>
    isFunction(maybe) && isBoolean(maybe('something')),
])

export const isGuardTests = generateGuard<GuardTests>([
  isArray,
  (maybe) => every(maybe, isGuardTest),
])

export const isGuardTestGroups = generateGuard<GuardTests>([
  isArray,
  (maybe) =>
    every(
      maybe,
      (testGroup) => isGuardTest(testGroup) || isGuardTests(testGroup),
    ),
])
