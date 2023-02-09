import { toNumericValue } from '../../css-value'

describe('utilities', () => {
  describe('css-value', () => {
    describe('toNumericValue()', () => {
      it('does not change numbers', () => {
        expect(toNumericValue(1234)).toBe(1234)
        expect(toNumericValue(1.234)).toBe(1.234)
        expect(toNumericValue(1_234)).toBe(1234)
      })

      it('changes non-finite numbers to undefined', () => {
        expect(toNumericValue(Infinity)).toBeUndefined()
        expect(toNumericValue(NaN)).toBeUndefined()
      })

      it('changes number-like strings to numbers', () => {
        expect(toNumericValue('1234')).toBe(1234)
        expect(toNumericValue('1.234')).toBe(1.234)
      })

      it('changes untrimmed number-like strings to numbers', () => {
        expect(toNumericValue('  1234  ')).toBe(1234)
        expect(toNumericValue('   1.234')).toBe(1.234)
      })

      it('changes empty strings to undefined', () => {
        expect(toNumericValue('  ')).toBeUndefined()
        expect(toNumericValue('')).toBeUndefined()
      })

      it('changes strings that do not convert to numbers to undefined', () => {
        expect(toNumericValue('this is not a number')).toBeUndefined()
      })

      it('changes anything else to undefined', () => {
        expect(toNumericValue(undefined)).toBeUndefined()
        // @ts-expect-error testing
        expect(toNumericValue(true)).toBeUndefined()
        // @ts-expect-error testing
        expect(toNumericValue({})).toBeUndefined()
        // @ts-expect-error testing
        expect(toNumericValue([])).toBeUndefined()
      })
    })
  })
})
