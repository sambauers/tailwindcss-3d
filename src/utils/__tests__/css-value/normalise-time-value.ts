import { VALID_TIME_UNITS, normaliseTimeValue } from '../../css-value'

describe('utilities', () => {
  describe('css-value', () => {
    describe('normaliseTimeValue()', () => {
      it('normalises a valid time', () => {
        VALID_TIME_UNITS.forEach((unit) => {
          const value = `50${unit}`
          expect(normaliseTimeValue(value)).toBe(value)
        })
      })

      it('defaults to correct unit', () => {
        expect(normaliseTimeValue('30')).toBe('30s')
      })

      it('substitutes with the default when necessary', () => {
        expect(normaliseTimeValue('abc', '50ms')).toBe('50ms')
      })

      it('accepts options', () => {
        expect(
          normaliseTimeValue('150foo', undefined, { validUnits: ['foo'] })
        ).toBe('150foo')
      })
    })
  })
})
