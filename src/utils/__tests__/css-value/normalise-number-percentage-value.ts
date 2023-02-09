import { normaliseNumberPercentageValue } from '../../css-value'

describe('utilities', () => {
  describe('css-value', () => {
    describe('normaliseNumberPercentageValue()', () => {
      it('normalises a valid number', () => {
        expect(normaliseNumberPercentageValue(50)).toBe('50')
        expect(normaliseNumberPercentageValue('50')).toBe('50')
        expect(normaliseNumberPercentageValue(0.5)).toBe('0.5')
        expect(normaliseNumberPercentageValue('0.5')).toBe('0.5')
      })

      it('normalises a valid percentage', () => {
        expect(normaliseNumberPercentageValue('45%')).toBe('45%')
      })

      it('removes any unit', () => {
        expect(normaliseNumberPercentageValue('30px')).toBe('30')
        expect(normaliseNumberPercentageValue('0.5rem')).toBe('0.5')
      })

      it('substitutes with the default when necessary', () => {
        expect(normaliseNumberPercentageValue('abc', '50')).toBe('50')
      })

      it('accepts options', () => {
        expect(
          normaliseNumberPercentageValue('150foo', undefined, {
            validUnits: ['foo'],
          })
        ).toBe('150foo')
      })
    })
  })
})
