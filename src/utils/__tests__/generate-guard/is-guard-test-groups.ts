import { isGuardTestGroups } from '../../generate-guard'

describe('utilities', () => {
  describe('generate-guard', () => {
    describe('isGuardTestGroups()', () => {
      it('validates an array of guard test groups', () => {
        expect(
          isGuardTestGroups([
            [(maybe) => typeof maybe === 'string', (maybe) => maybe !== ''],
            [(maybe) => typeof maybe === 'boolean', (maybe) => maybe === true],
          ]),
        ).toBe(true)
      })

      it('validates an array of guard test groups and guard tests', () => {
        expect(
          isGuardTestGroups([
            [(maybe) => typeof maybe === 'string', (maybe) => maybe !== ''],
            (maybe) => typeof maybe === 'boolean',
          ]),
        ).toBe(true)
      })

      it('does not validate a function that does not return a boolen', () => {
        expect(
          isGuardTestGroups([
            [
              (maybe) => typeof maybe === 'string',
              (maybe) => `call me ${maybe}`,
            ],
            [(maybe) => typeof maybe === 'boolean', (maybe) => maybe === true],
          ]),
        ).toBe(false)
      })

      it('does not validate a single guard test', () => {
        expect(isGuardTestGroups((maybe) => typeof maybe === 'string')).toBe(
          false,
        )
      })

      it('does not validate anything that is not an array of guard tests', () => {
        expect(isGuardTestGroups('')).toBe(false)
        expect(isGuardTestGroups('some string')).toBe(false)
        expect(isGuardTestGroups(1234)).toBe(false)
        expect(isGuardTestGroups(NaN)).toBe(false)
        expect(isGuardTestGroups(true)).toBe(false)
        expect(isGuardTestGroups(undefined)).toBe(false)
        expect(isGuardTestGroups({ some: 'object' })).toBe(false)
        expect(isGuardTestGroups(['some', 'array'])).toBe(false)
      })
    })
  })
})
