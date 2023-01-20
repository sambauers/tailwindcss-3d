import { isGuardTest } from '../../generate-guard'

describe('utilities', () => {
  describe('generate-guard', () => {
    describe('isGuardTest()', () => {
      it('validates a single guard test', () => {
        expect(isGuardTest((maybe) => typeof maybe === 'string')).toBe(true)
      })

      it('does not validate a function that does not return a boolen', () => {
        expect(isGuardTest((maybe) => `call me ${maybe}`)).toBe(false)
      })

      it('does not validate an array of guard tests', () => {
        expect(isGuardTest([(maybe) => typeof maybe === 'string'])).toBe(false)
      })

      it('does not validate anything that is not a function', () => {
        expect(isGuardTest('')).toBe(false)
        expect(isGuardTest('some string')).toBe(false)
        expect(isGuardTest(1234)).toBe(false)
        expect(isGuardTest(NaN)).toBe(false)
        expect(isGuardTest(true)).toBe(false)
        expect(isGuardTest(undefined)).toBe(false)
        expect(isGuardTest({ some: 'object' })).toBe(false)
        expect(isGuardTest(['some', 'array'])).toBe(false)
      })
    })
  })
})
