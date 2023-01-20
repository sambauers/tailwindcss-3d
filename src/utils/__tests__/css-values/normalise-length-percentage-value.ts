import {
  VALID_LENGTH_UNITS,
  normaliseLengthPercentageValue,
} from '../../css-value'

describe('utilities', () => {
  describe('css-values', () => {
    describe('normaliseLengthPercentageValue()', () => {
      it('normalises a valid length', () => {
        VALID_LENGTH_UNITS.forEach((unit) => {
          const value = `50${unit}`
          expect(normaliseLengthPercentageValue(value)).toBe(value)
        })
      })

      it('normalises a valid percentage', () => {
        expect(normaliseLengthPercentageValue('45%')).toBe('45%')
      })

      it('defaults to correct unit', () => {
        expect(normaliseLengthPercentageValue('30')).toBe('30px')
      })

      it('substitutes with the default when necessary', () => {
        expect(normaliseLengthPercentageValue('abc', '50rem')).toBe('50rem')
      })

      it('accepts options', () => {
        expect(
          normaliseLengthPercentageValue('150foo', undefined, {
            validUnits: ['foo'],
          })
        ).toBe('150foo')
      })
    })
  })
})
