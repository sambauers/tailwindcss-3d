import { compileCSS } from '../../../../jest/utils'

describe('css-animations', () => {
  describe('BounceAndSpin', () => {
    describe('normaliseValues()', () => {
      it('will not produce CSS if no valid bounce values are present in the theme', async () => {
        const css = await compileCSS(
          '<div class="animate-bounce-and-spin-y"></div>',
          false,
          { bounceAndSpin: { '0': 0 } }
        )

        expect(css).toBe('')
      })
    })
  })
})
