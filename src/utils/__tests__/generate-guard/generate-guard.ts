import { generateGuard } from '../../generate-guard'

describe('utilities', () => {
  describe('generate-guard', () => {
    describe('generateGuard()', () => {
      it('generates a guard that validates a string', () => {
        const isString = generateGuard((maybe) => typeof maybe === 'string')
        expect(isString).toStrictEqual(expect.any(Function))
        expect(isString('')).toBe(true)
        expect(isString('some string')).toBe(true)
        expect(isString(1234)).toBe(false)
        expect(isString(NaN)).toBe(false)
        expect(isString(true)).toBe(false)
        expect(isString(undefined)).toBe(false)
        expect(isString({ some: 'object' })).toBe(false)
        expect(isString(['some', 'array'])).toBe(false)
      })

      it('generates a guard that validates a string or a number', () => {
        const isStringOrNumber = generateGuard(
          (maybe) => typeof maybe === 'string',
          (maybe) => typeof maybe === 'number',
        )
        expect(isStringOrNumber).toStrictEqual(expect.any(Function))
        expect(isStringOrNumber('')).toBe(true)
        expect(isStringOrNumber('some string')).toBe(true)
        expect(isStringOrNumber(1234)).toBe(true)
        expect(isStringOrNumber(NaN)).toBe(true)
        expect(isStringOrNumber(true)).toBe(false)
        expect(isStringOrNumber(undefined)).toBe(false)
        expect(isStringOrNumber({ some: 'object' })).toBe(false)
        expect(isStringOrNumber(['some', 'array'])).toBe(false)
      })

      it('generates a guard that validates a finite number', () => {
        const isFiniteNumber = generateGuard([
          (maybe) => typeof maybe === 'number',
          (maybe) => isFinite(maybe),
        ])
        expect(isFiniteNumber).toStrictEqual(expect.any(Function))
        expect(isFiniteNumber('')).toBe(false)
        expect(isFiniteNumber('some string')).toBe(false)
        expect(isFiniteNumber(1234)).toBe(true)
        expect(isFiniteNumber(NaN)).toBe(false)
        expect(isFiniteNumber(true)).toBe(false)
        expect(isFiniteNumber(undefined)).toBe(false)
        expect(isFiniteNumber({ some: 'object' })).toBe(false)
        expect(isFiniteNumber(['some', 'array'])).toBe(false)
      })

      it('generates a guard that always returns false when there are no test groups', () => {
        const isNeverGoingToPass = generateGuard()
        expect(isNeverGoingToPass).toStrictEqual(expect.any(Function))
        expect(isNeverGoingToPass()).toBe(false)
      })

      it('generates a guard that can possibly return true when there are no tests in one test group', () => {
        const isSometimesGoingToPass = generateGuard(
          [],
          [(maybe) => typeof maybe === 'number'],
        )
        expect(isSometimesGoingToPass).toStrictEqual(expect.any(Function))
        expect(isSometimesGoingToPass).toStrictEqual(expect.any(Function))
        expect(isSometimesGoingToPass('')).toBe(false)
        expect(isSometimesGoingToPass('some string')).toBe(false)
        expect(isSometimesGoingToPass(1234)).toBe(true)
        expect(isSometimesGoingToPass(NaN)).toBe(true)
        expect(isSometimesGoingToPass(true)).toBe(false)
        expect(isSometimesGoingToPass(undefined)).toBe(false)
        expect(isSometimesGoingToPass({ some: 'object' })).toBe(false)
        expect(isSometimesGoingToPass(['some', 'array'])).toBe(false)
      })
    })
  })
})
