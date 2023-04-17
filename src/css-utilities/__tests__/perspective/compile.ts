import {
  compileCSS,
  cssClassRegExp,
  legacyTransform3DValue,
} from '../../../../jest/utils'

const testClassNames = [
  'perspective-none',
  'perspective-250',
  'perspective-[175px]',
]
const testElements = testClassNames
  .map((className) => `<div class="${className}"></div>`)
  .join('')

const perspectiveDeclaration = 'perspective: var(--tw-perspective)'
const legacyTransformDeclaration = `--webkit-transform: ${legacyTransform3DValue()}`
const transformDeclaration = `transform: ${legacyTransform3DValue()}`

describe('css-utilities', () => {
  describe('Perspective', () => {
    it('compiles', async () => {
      const css = await compileCSS(testElements)

      expect(css).toMatch(
        cssClassRegExp('perspective-none', [
          '--tw-perspective: none',
          perspectiveDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('perspective-250', [
          '--tw-perspective: 250px',
          perspectiveDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('perspective-\\[175px\\]', [
          '--tw-perspective: 175px',
          perspectiveDeclaration,
        ])
      )
    })

    it('compiles legacy', async () => {
      const css = await compileCSS(testElements, true)

      expect(css).toMatch(
        cssClassRegExp('perspective-none', [
          '--tw-perspective: none',
          legacyTransformDeclaration,
          transformDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('perspective-250', [
          '--tw-perspective: 250px',
          legacyTransformDeclaration,
          transformDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('perspective-\\[175px\\]', [
          '--tw-perspective: 175px',
          legacyTransformDeclaration,
          transformDeclaration,
        ])
      )
    })
  })
})
