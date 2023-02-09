import { VALID_ANGLE_UNITS, normaliseAngleValue } from '../../css-value'

describe('utilities', () => {
  describe('css-value', () => {
    describe('normaliseAngleValue()', () => {
      it('normalises a valid angle', () => {
        VALID_ANGLE_UNITS.forEach((unit) => {
          const value = `50${unit}`
          expect(normaliseAngleValue(value)).toBe(value)
        })
      })

      it('defaults to correct unit', () => {
        expect(normaliseAngleValue('30')).toBe('30deg')
      })

      it('substitutes with the default when necessary', () => {
        expect(normaliseAngleValue('abc', '50deg')).toBe('50deg')
      })

      it('accepts options', () => {
        expect(
          normaliseAngleValue('150foo', undefined, { validUnits: ['foo'] })
        ).toBe('150foo')
      })
    })
  })
})
