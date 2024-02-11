import { compileCSS, cssClassRegExp } from '../../../../jest/utils'

describe('css-utilities', () => {
  describe('Backface', () => {
    it('compiles', async () => {
      const css = await compileCSS(`
        <div class="backface-visible"></div>
        <div class="backface-hidden"></div>
      `)

      expect(css).toMatch(
        cssClassRegExp('backface-visible', 'backface-visibility: visible'),
      )
      expect(css).toMatch(
        cssClassRegExp('backface-hidden', 'backface-visibility: hidden'),
      )
    })
  })
})
