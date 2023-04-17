import {
  compileCSS,
  cssClassRegExp,
  legacyTransform3DValue,
} from '../../../../jest/utils'

const testClassNames = [
  'translate-x-0',
  'translate-x-px',
  'translate-x-5',
  '-translate-x-12',
  'translate-x-[4rem]',
  'translate-y-0',
  'translate-y-px',
  'translate-y-5',
  '-translate-y-12',
  'translate-y-[4rem]',
  'translate-z-0',
  'translate-z-px',
  'translate-z-5',
  '-translate-z-12',
  'translate-z-[4rem]',
]
const testElements = testClassNames
  .map((className) => `<div class="${className}"></div>`)
  .join('')

const translateDeclaration =
  'translate: var(--tw-translate-x) var(--tw-translate-y) var(--tw-translate-z)'
const webkitTransformDeclaration = `--webkit-transform: ${legacyTransform3DValue()}`
const transformDeclaration = `transform: ${legacyTransform3DValue()}`

describe('css-utilities', () => {
  describe('Translate', () => {
    it('compiles', async () => {
      const css = await compileCSS(testElements)

      expect(css).toMatch(
        cssClassRegExp('translate-x-0', [
          '--tw-translate-x: 0px',
          translateDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('translate-x-px', [
          '--tw-translate-x: 1px',
          translateDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('translate-x-5', [
          '--tw-translate-x: 1.25rem',
          translateDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('-translate-x-12', [
          '--tw-translate-x: -3rem',
          translateDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('translate-x-\\[4rem\\]', [
          '--tw-translate-x: 4rem',
          translateDeclaration,
        ])
      )

      expect(css).toMatch(
        cssClassRegExp('translate-y-0', [
          '--tw-translate-y: 0px',
          translateDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('translate-y-px', [
          '--tw-translate-y: 1px',
          translateDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('translate-y-5', [
          '--tw-translate-y: 1.25rem',
          translateDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('-translate-y-12', [
          '--tw-translate-y: -3rem',
          translateDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('translate-y-\\[4rem\\]', [
          '--tw-translate-y: 4rem',
          translateDeclaration,
        ])
      )

      expect(css).toMatch(
        cssClassRegExp('translate-z-0', [
          '--tw-translate-z: 0px',
          translateDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('translate-z-px', [
          '--tw-translate-z: 1px',
          translateDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('translate-z-5', [
          '--tw-translate-z: 1.25rem',
          translateDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('-translate-z-12', [
          '--tw-translate-z: -3rem',
          translateDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('translate-z-\\[4rem\\]', [
          '--tw-translate-z: 4rem',
          translateDeclaration,
        ])
      )
    })

    it('compiles legacy', async () => {
      const css = await compileCSS(testElements, true)

      expect(css).toMatch(
        cssClassRegExp('translate-x-0', [
          '--tw-translate-x: 0px',
          webkitTransformDeclaration,
          transformDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('translate-x-px', [
          '--tw-translate-x: 1px',
          webkitTransformDeclaration,
          transformDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('translate-x-5', [
          '--tw-translate-x: 1.25rem',
          webkitTransformDeclaration,
          transformDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('-translate-x-12', [
          '--tw-translate-x: -3rem',
          webkitTransformDeclaration,
          transformDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('translate-x-\\[4rem\\]', [
          '--tw-translate-x: 4rem',
          webkitTransformDeclaration,
          transformDeclaration,
        ])
      )

      expect(css).toMatch(
        cssClassRegExp('translate-y-0', [
          '--tw-translate-y: 0px',
          webkitTransformDeclaration,
          transformDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('translate-y-px', [
          '--tw-translate-y: 1px',
          webkitTransformDeclaration,
          transformDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('translate-y-5', [
          '--tw-translate-y: 1.25rem',
          webkitTransformDeclaration,
          transformDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('-translate-y-12', [
          '--tw-translate-y: -3rem',
          webkitTransformDeclaration,
          transformDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('translate-y-\\[4rem\\]', [
          '--tw-translate-y: 4rem',
          webkitTransformDeclaration,
          transformDeclaration,
        ])
      )

      expect(css).toMatch(
        cssClassRegExp('translate-z-0', [
          '--tw-translate-z: 0px',
          webkitTransformDeclaration,
          transformDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('translate-z-px', [
          '--tw-translate-z: 1px',
          webkitTransformDeclaration,
          transformDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('translate-z-5', [
          '--tw-translate-z: 1.25rem',
          webkitTransformDeclaration,
          transformDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('-translate-z-12', [
          '--tw-translate-z: -3rem',
          webkitTransformDeclaration,
          transformDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('translate-z-\\[4rem\\]', [
          '--tw-translate-z: 4rem',
          webkitTransformDeclaration,
          transformDeclaration,
        ])
      )
    })
  })
})
