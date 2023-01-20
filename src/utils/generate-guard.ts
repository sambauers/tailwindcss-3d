import _ from 'lodash'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GuardTest = (arg: any) => boolean
type GuardTests = GuardTest | GuardTest[]
type GuardTestGroups = GuardTests[]

export const generateGuard = <T>(...testGroups: GuardTestGroups) => {
  if (testGroups.length < 1) {
    return () => false
  }

  return (maybe?: unknown): maybe is T =>
    _.some(testGroups, (tests) => {
      const safeTests = _.castArray(tests)

      if (safeTests.length < 1) {
        return false
      }

      return _.every(
        _.over<boolean>(...safeTests)(maybe),
        (result) => result === true
      )
    })
}

export const isGuardTest = generateGuard<GuardTest>([
  _.isFunction,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (maybe: (...args: any[]) => any) =>
    _.isFunction(maybe) && _.isBoolean(maybe('something')),
])

export const isGuardTests = generateGuard<GuardTests>([
  _.isArray,
  (maybe) => _.every(maybe, isGuardTest),
])

export const isGuardTestGroups = generateGuard<GuardTests>([
  _.isArray,
  (maybe) =>
    _.every(
      maybe,
      (testGroup) => isGuardTest(testGroup) || isGuardTests(testGroup)
    ),
])
