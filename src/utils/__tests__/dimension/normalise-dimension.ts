import { normaliseDimension } from '../../dimension'

describe('utilities', () => {
  describe('dimension', () => {
    describe('normaliseDimension()', () => {
      it('correctly detects valid dimensions', () => {
        expect(normaliseDimension('3d')).toBe('3d')
        expect(normaliseDimension('2d')).toBe('2d')
      })

      it('cares about letter case', () => {
        expect(normaliseDimension('3D')).toBe('3d')
        expect(normaliseDimension('2D')).toBe('3d')
      })

      it('defaults invalid dimensions to 3d', () => {
        expect(normaliseDimension('foo')).toBe('3d')
        expect(normaliseDimension(undefined)).toBe('3d')
      })
    })
  })
})
