import { normaliseNumberValue } from '../../css-value'

describe('utilities', () => {
  describe('css-value', () => {
    describe('normaliseNumberValue()', () => {
      it('normalises a valid number', () => {
        expect(normaliseNumberValue(50)).toBe('50')
        expect(normaliseNumberValue('50')).toBe('50')
        expect(normaliseNumberValue(0.5)).toBe('0.5')
        expect(normaliseNumberValue('0.5')).toBe('0.5')
      })

      it('removes any unit', () => {
        expect(normaliseNumberValue('30px')).toBe('30')
        expect(normaliseNumberValue('0.5rem')).toBe('0.5')
      })

      it('substitutes with the default when necessary', () => {
        expect(normaliseNumberValue('abc', '50')).toBe('50')
      })

      it('accepts options', () => {
        expect(
          normaliseNumberValue('150foo', undefined, { validUnits: ['foo'] })
        ).toBe('150foo')
      })
    })
  })
})
