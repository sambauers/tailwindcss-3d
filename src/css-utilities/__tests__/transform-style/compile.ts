import { compileCSS, cssClassRegExp } from '../../../../jest/utils'

describe('css-utilities', () => {
  describe('TransformStyle', () => {
    it('compiles', async () => {
      const css = await compileCSS(`
        <div class="transform-style-flat"></div>
        <div class="transform-style-3d"></div>
      `)

      expect(css).toMatch(
        cssClassRegExp('transform-style-flat', 'transform-style: flat'),
      )
      expect(css).toMatch(
        cssClassRegExp('transform-style-3d', 'transform-style: preserve-3d'),
      )
    })
  })
})
