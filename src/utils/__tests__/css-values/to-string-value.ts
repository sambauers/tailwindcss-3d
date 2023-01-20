import { toStringValue } from '../../css-value'

describe('utilities', () => {
  describe('css-values', () => {
    describe('toStringValue()', () => {
      it('does not change trimmed strings', () => {
        expect(toStringValue('testing')).toBe('testing')
      })

      it('trims untrimmed strings', () => {
        expect(toStringValue('  testing things  ')).toBe('testing things')
      })

      it('changes a number to a string', () => {
        expect(toStringValue(1234)).toBe('1234')
        expect(toStringValue(1.234)).toBe('1.234')
        expect(toStringValue(1_234)).toBe('1234')
      })

      it('changes anything else to undefined', () => {
        expect(toStringValue(undefined)).toBeUndefined()
        // @ts-expect-error testing
        expect(toStringValue(true)).toBeUndefined()
        // @ts-expect-error testing
        expect(toStringValue({})).toBeUndefined()
        // @ts-expect-error testing
        expect(toStringValue([])).toBeUndefined()
      })
    })
  })
})
