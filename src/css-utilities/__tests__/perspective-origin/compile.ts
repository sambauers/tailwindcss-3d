import { compileCSS, cssClassRegExp } from '../../../../jest/utils'

describe('css-utilities', () => {
  describe('PerspectiveOrigin', () => {
    it('compiles', async () => {
      const css = await compileCSS(`
        <div class="perspective-origin-center"></div>
        <div class="perspective-origin-top-left"></div>
        <div class="perspective-origin-[150%]"></div>
        <div class="perspective-origin-[250%_-500%]"></div>
        <div class="perspective-origin-[top_-500%]"></div>
      `)

      expect(css).toMatch(
        cssClassRegExp(
          'perspective-origin-center',
          'perspective-origin: center'
        )
      )
      expect(css).toMatch(
        cssClassRegExp(
          'perspective-origin-top-left',
          'perspective-origin: top left'
        )
      )
      expect(css).toMatch(
        cssClassRegExp(
          'perspective-origin-\\[150\\%\\]',
          'perspective-origin: 150%'
        )
      )
      expect(css).toMatch(
        cssClassRegExp(
          'perspective-origin-\\[250\\%_-500\\%\\]',
          'perspective-origin: 250% -500%'
        )
      )
      expect(css).toMatch(
        cssClassRegExp(
          'perspective-origin-\\[top_-500\\%\\]',
          'perspective-origin: top -500%'
        )
      )
    })
  })
})
