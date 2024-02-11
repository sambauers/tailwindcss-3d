import { compileCSS, cssClassRegExp } from '../../../../jest/utils'

describe('css-utilities', () => {
  describe('TransformBox', () => {
    it('compiles', async () => {
      const css = await compileCSS(`
        <div class="transform-box-content"></div>
        <div class="transform-box-fill"></div>
      `)

      expect(css).toMatch(
        cssClassRegExp('transform-box-content', 'transform-box: content-box'),
      )
      expect(css).toMatch(
        cssClassRegExp('transform-box-fill', 'transform-box: fill-box'),
      )
    })
  })
})
