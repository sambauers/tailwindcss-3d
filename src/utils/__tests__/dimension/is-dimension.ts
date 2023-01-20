import { isDimension } from '../../dimension'

describe('utilities', () => {
  describe('dimension', () => {
    describe('isDimension()', () => {
      it('correctly detects valid dimensions', () => {
        expect(isDimension('3d')).toBe(true)
        expect(isDimension('2d')).toBe(true)
      })

      it('cares about letter case', () => {
        expect(isDimension('3D')).toBe(false)
        expect(isDimension('2D')).toBe(false)
      })

      it('rejects invalid dimensions', () => {
        expect(isDimension('foo')).toBe(false)
        expect(isDimension(123)).toBe(false)
        expect(isDimension(true)).toBe(false)
        expect(isDimension({})).toBe(false)
        expect(isDimension(undefined)).toBe(false)
      })
    })
  })
})
