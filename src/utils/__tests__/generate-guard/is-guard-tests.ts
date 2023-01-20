import { isGuardTests } from '../../generate-guard'

describe('utilities', () => {
  describe('generate-guard', () => {
    describe('isGuardTests()', () => {
      it('validates an array of guard tests', () => {
        expect(
          isGuardTests([
            (maybe) => typeof maybe === 'string',
            (maybe) => typeof maybe === 'number',
          ])
        ).toBe(true)
      })

      it('does not validate a function that does not return a boolen', () => {
        expect(
          isGuardTests([
            (maybe) => typeof maybe === 'string',
            (maybe) => `call me ${maybe}`,
          ])
        ).toBe(false)
      })

      it('does not validate a single guard test', () => {
        expect(isGuardTests((maybe) => typeof maybe === 'string')).toBe(false)
      })

      it('does not validate anything that is not an array of functions', () => {
        expect(isGuardTests('')).toBe(false)
        expect(isGuardTests('some string')).toBe(false)
        expect(isGuardTests(1234)).toBe(false)
        expect(isGuardTests(NaN)).toBe(false)
        expect(isGuardTests(true)).toBe(false)
        expect(isGuardTests(undefined)).toBe(false)
        expect(isGuardTests({ some: 'object' })).toBe(false)
        expect(isGuardTests(['some', 'array'])).toBe(false)
      })
    })
  })
})
