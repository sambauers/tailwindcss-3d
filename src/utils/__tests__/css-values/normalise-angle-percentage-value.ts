import {
  VALID_ANGLE_UNITS,
  normaliseAnglePercentageValue,
} from '../../css-value'

describe('utilities', () => {
  describe('css-values', () => {
    describe('normaliseAnglePercentageValue()', () => {
      it('normalises a valid angle', () => {
        VALID_ANGLE_UNITS.forEach((unit) => {
          const value = `50${unit}`
          expect(normaliseAnglePercentageValue(value)).toBe(value)
        })
      })

      it('normalises a valid percentage', () => {
        expect(normaliseAnglePercentageValue('45%')).toBe('45%')
      })

      it('defaults to correct unit', () => {
        expect(normaliseAnglePercentageValue('30')).toBe('30deg')
      })

      it('substitutes with the default when necessary', () => {
        expect(normaliseAnglePercentageValue('abc', '50deg')).toBe('50deg')
      })

      it('accepts options', () => {
        expect(
          normaliseAnglePercentageValue('150foo', undefined, {
            validUnits: ['foo'],
          })
        ).toBe('150foo')
      })
    })
  })
})
