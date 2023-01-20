import { normaliseAlphaValue } from '../../css-value'

describe('utilities', () => {
  describe('css-values', () => {
    describe('normaliseAlphaValue()', () => {
      it('normalises a valid percentage', () => {
        expect(normaliseAlphaValue('50%', '0')).toBe('50%')
      })

      it('normalises a valid number', () => {
        expect(normaliseAlphaValue('0.5', '0')).toBe('0.5')
        expect(normaliseAlphaValue(0.5, '0')).toBe('0.5')
      })

      it('substitutes with the default when necessary', () => {
        expect(normaliseAlphaValue('abc', '0.25')).toBe('0.25')
      })

      it('clamps a percentage', () => {
        expect(normaliseAlphaValue('-10%', '0')).toBe('0%')
        expect(normaliseAlphaValue('110%', '0')).toBe('100%')
      })

      it('clamps a number', () => {
        expect(normaliseAlphaValue(-0.5, '0')).toBe('0')
        expect(normaliseAlphaValue(1.5, '0')).toBe('1')
      })

      it('returns default when no value is passed', () => {
        expect(normaliseAlphaValue(undefined, '0.75')).toBe('0.75')
        expect(normaliseAlphaValue(undefined, '75%')).toBe('75%')
      })

      it('accepts options for percentage', () => {
        expect(
          normaliseAlphaValue('150%', '0', { percentage: { upperLimit: 200 } })
        ).toBe('150%')
      })

      it('accepts options for number', () => {
        expect(
          normaliseAlphaValue('1.5', '0', { number: { upperLimit: 2 } })
        ).toBe('1.5')
      })
    })
  })
})
