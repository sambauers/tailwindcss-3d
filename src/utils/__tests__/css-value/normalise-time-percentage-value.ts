import { normaliseTimePercentageValue, VALID_TIME_UNITS } from '../../css-value'

describe('utilities', () => {
  describe('css-value', () => {
    describe('normaliseTimePercentageValue()', () => {
      it('normalises a valid time', () => {
        VALID_TIME_UNITS.forEach((unit) => {
          const value = `50${unit}`
          expect(normaliseTimePercentageValue(value)).toBe(value)
        })
      })

      it('normalises a valid percentage', () => {
        expect(normaliseTimePercentageValue('45%')).toBe('45%')
      })

      it('defaults to correct unit', () => {
        expect(normaliseTimePercentageValue('30')).toBe('30s')
      })

      it('substitutes with the default when necessary', () => {
        expect(normaliseTimePercentageValue('abc', '50ms')).toBe('50ms')
      })

      it('accepts options', () => {
        expect(
          normaliseTimePercentageValue('150foo', undefined, {
            validUnits: ['foo'],
          }),
        ).toBe('150foo')
      })
    })
  })
})
