import { Perspective } from '../..'

describe('css-utilities', () => {
  describe('Perspective', () => {
    describe('normaliseFunctionValues()', () => {
      it('will return fallback values when required', async () => {
        expect(Perspective.normaliseFunctionValues()).toBe(
          'var(--tw-perspective)'
        )

        expect(Perspective.normaliseFunctionValues({ dimension: '2d' })).toBe(
          'none'
        )

        expect(
          Perspective.normaliseFunctionValues({ perspective: '200px' })
        ).toBe('200px')
      })
    })
  })
})
