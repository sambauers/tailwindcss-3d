import { normalisePercentageValue } from '../../css-value'

describe('utilities', () => {
  describe('css-values', () => {
    describe('normalisePercentageValue()', () => {
      it('normalises a valid percentage', () => {
        expect(normalisePercentageValue('50%')).toBe('50%')
        expect(normalisePercentageValue('0.5%')).toBe('0.5%')
      })

      it('defaults to correct unit', () => {
        expect(normalisePercentageValue('30')).toBe('30%')
      })

      it('substitutes with the default when necessary', () => {
        expect(normalisePercentageValue('abc', '50%')).toBe('50%')
      })

      it('accepts options', () => {
        expect(
          normalisePercentageValue('150foo', undefined, { validUnits: ['foo'] })
        ).toBe('150foo')
      })
    })
  })
})
