import { compileCSS } from '../../../../jest/utils'

describe('css-animations', () => {
  describe('Spin', () => {
    describe('normaliseValues()', () => {
      it('will not produce CSS if no valid spin values are present in the theme', async () => {
        const css = await compileCSS(
          '<div class="animate-spin-y"></div>',
          false,
          { spin: { '0': 0 } }
        )

        expect(css).toBe('')
      })
    })
  })
})
