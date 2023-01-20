import { VALID_LENGTH_UNITS, normaliseLengthValue } from '../../css-value'

describe('utilities', () => {
  describe('css-values', () => {
    describe('normaliseLengthValue()', () => {
      it('normalises a valid length', () => {
        VALID_LENGTH_UNITS.forEach((unit) => {
          const value = `50${unit}`
          expect(normaliseLengthValue(value)).toBe(value)
        })
      })

      it('defaults to correct unit', () => {
        expect(normaliseLengthValue('30')).toBe('30px')
      })

      it('substitutes with the default when necessary', () => {
        expect(normaliseLengthValue('abc', '50rem')).toBe('50rem')
      })

      it('accepts options', () => {
        expect(
          normaliseLengthValue('150foo', undefined, { validUnits: ['foo'] })
        ).toBe('150foo')
      })
    })
  })
})
