import { compileCSS } from '../../../../jest/utils'

describe('css-animations', () => {
  describe('Bounce', () => {
    describe('normaliseValues()', () => {
      it('will not produce CSS if no valid bounce values are present in the theme', async () => {
        const css = await compileCSS(
          '<div class="animate-bounce-y"></div>',
          false,
          { bounce: { '0': 0 } }
        )

        expect(css).toBe('')
      })
    })
  })
})
