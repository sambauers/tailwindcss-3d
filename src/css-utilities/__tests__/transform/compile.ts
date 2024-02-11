import {
  compileCSS,
  cssClassRegExp,
  legacyTransform3DValue,
} from '../../../../jest/utils'

const testClassNames = [
  'rotate-0',
  'rotate-12',
  '-rotate-45',
  'rotate-[0.4turn]',
  'rotate-x-0',
  'rotate-x-12',
  '-rotate-x-45',
  'rotate-x-[0.4turn]',
  'rotate-y-0',
  'rotate-y-12',
  '-rotate-y-45',
  'rotate-y-[0.4turn]',
  'rotate-z-0',
  'rotate-z-12',
  '-rotate-z-45',
  'rotate-z-[0.4turn]',
  'skew-x-0',
  'skew-x-12',
  '-skew-x-3',
  'skew-x-[23deg]',
  'skew-y-0',
  'skew-y-12',
  '-skew-y-3',
  'skew-y-[23deg]',
]
const testElements = testClassNames
  .map((className) => `<div class="${className}"></div>`)
  .join('')

const rotateDeclaration = 'rotate: var(--tw-rotate-z)'
const transformValue =
  'rotateX(var(--tw-rotate-x)) rotateY(var(--tw-rotate-y)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))'
const webkitTransformDeclaration = `--webkit-transform: ${transformValue}`
const transformDeclaration = `transform: ${transformValue}`
const webkitLegacyTransformDeclaration = `--webkit-transform: ${legacyTransform3DValue()}`
const legacyTransformDeclaration = `transform: ${legacyTransform3DValue()}`

describe('css-utilities', () => {
  describe('Scale', () => {
    it('compiles', async () => {
      const css = await compileCSS(testElements)

      expect(css).toMatch(
        cssClassRegExp('rotate-0', ['--tw-rotate-z: 0deg', rotateDeclaration]),
      )
      expect(css).toMatch(
        cssClassRegExp('rotate-12', [
          '--tw-rotate-z: 12deg',
          rotateDeclaration,
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp('-rotate-45', [
          '--tw-rotate-z: -45deg',
          rotateDeclaration,
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp('rotate-\\[0\\.4turn\\]', [
          '--tw-rotate-z: 0.4turn',
          rotateDeclaration,
        ]),
      )

      expect(css).toMatch(
        cssClassRegExp('rotate-x-0', [
          '--tw-rotate-x: 0deg',
          webkitTransformDeclaration,
          transformDeclaration,
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp('rotate-x-12', [
          '--tw-rotate-x: 12deg',
          webkitTransformDeclaration,
          transformDeclaration,
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp('-rotate-x-45', [
          '--tw-rotate-x: -45deg',
          webkitTransformDeclaration,
          transformDeclaration,
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp('rotate-x-\\[0\\.4turn\\]', [
          '--tw-rotate-x: 0.4turn',
          webkitTransformDeclaration,
          transformDeclaration,
        ]),
      )

      expect(css).toMatch(
        cssClassRegExp('rotate-y-0', [
          '--tw-rotate-y: 0deg',
          webkitTransformDeclaration,
          transformDeclaration,
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp('rotate-y-12', [
          '--tw-rotate-y: 12deg',
          webkitTransformDeclaration,
          transformDeclaration,
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp('-rotate-y-45', [
          '--tw-rotate-y: -45deg',
          webkitTransformDeclaration,
          transformDeclaration,
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp('rotate-y-\\[0\\.4turn\\]', [
          '--tw-rotate-y: 0.4turn',
          webkitTransformDeclaration,
          transformDeclaration,
        ]),
      )

      expect(css).toMatch(
        cssClassRegExp('rotate-z-0', [
          '--tw-rotate-z: 0deg',
          rotateDeclaration,
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp('rotate-z-12', [
          '--tw-rotate-z: 12deg',
          rotateDeclaration,
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp('-rotate-z-45', [
          '--tw-rotate-z: -45deg',
          rotateDeclaration,
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp('rotate-z-\\[0\\.4turn\\]', [
          '--tw-rotate-z: 0.4turn',
          rotateDeclaration,
        ]),
      )

      expect(css).toMatch(
        cssClassRegExp('skew-x-0', [
          '--tw-skew-x: 0deg',
          webkitTransformDeclaration,
          transformDeclaration,
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp('skew-x-12', [
          '--tw-skew-x: 12deg',
          webkitTransformDeclaration,
          transformDeclaration,
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp('-skew-x-3', [
          '--tw-skew-x: -3deg',
          webkitTransformDeclaration,
          transformDeclaration,
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp('skew-x-\\[23deg\\]', [
          '--tw-skew-x: 23deg',
          webkitTransformDeclaration,
          transformDeclaration,
        ]),
      )

      expect(css).toMatch(
        cssClassRegExp('skew-y-0', [
          '--tw-skew-y: 0deg',
          webkitTransformDeclaration,
          transformDeclaration,
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp('skew-y-12', [
          '--tw-skew-y: 12deg',
          webkitTransformDeclaration,
          transformDeclaration,
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp('-skew-y-3', [
          '--tw-skew-y: -3deg',
          webkitTransformDeclaration,
          transformDeclaration,
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp('skew-y-\\[23deg\\]', [
          '--tw-skew-y: 23deg',
          webkitTransformDeclaration,
          transformDeclaration,
        ]),
      )
    })

    it('compiles legacy', async () => {
      const css = await compileCSS(testElements, true)

      expect(css).toMatch(
        cssClassRegExp('rotate-0', [
          '--tw-rotate-z: 0deg',
          webkitLegacyTransformDeclaration,
          legacyTransformDeclaration,
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp('rotate-12', [
          '--tw-rotate-z: 12deg',
          webkitLegacyTransformDeclaration,
          legacyTransformDeclaration,
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp('-rotate-45', [
          '--tw-rotate-z: -45deg',
          webkitLegacyTransformDeclaration,
          legacyTransformDeclaration,
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp('rotate-\\[0\\.4turn\\]', [
          '--tw-rotate-z: 0.4turn',
          webkitLegacyTransformDeclaration,
          legacyTransformDeclaration,
        ]),
      )

      expect(css).toMatch(
        cssClassRegExp('rotate-x-0', [
          '--tw-rotate-x: 0deg',
          webkitLegacyTransformDeclaration,
          legacyTransformDeclaration,
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp('rotate-x-12', [
          '--tw-rotate-x: 12deg',
          webkitLegacyTransformDeclaration,
          legacyTransformDeclaration,
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp('-rotate-x-45', [
          '--tw-rotate-x: -45deg',
          webkitLegacyTransformDeclaration,
          legacyTransformDeclaration,
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp('rotate-x-\\[0\\.4turn\\]', [
          '--tw-rotate-x: 0.4turn',
          webkitLegacyTransformDeclaration,
          legacyTransformDeclaration,
        ]),
      )

      expect(css).toMatch(
        cssClassRegExp('rotate-y-0', [
          '--tw-rotate-y: 0deg',
          webkitLegacyTransformDeclaration,
          legacyTransformDeclaration,
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp('rotate-y-12', [
          '--tw-rotate-y: 12deg',
          webkitLegacyTransformDeclaration,
          legacyTransformDeclaration,
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp('-rotate-y-45', [
          '--tw-rotate-y: -45deg',
          webkitLegacyTransformDeclaration,
          legacyTransformDeclaration,
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp('rotate-y-\\[0\\.4turn\\]', [
          '--tw-rotate-y: 0.4turn',
          webkitLegacyTransformDeclaration,
          legacyTransformDeclaration,
        ]),
      )

      expect(css).toMatch(
        cssClassRegExp('rotate-z-0', [
          '--tw-rotate-z: 0deg',
          webkitLegacyTransformDeclaration,
          legacyTransformDeclaration,
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp('rotate-z-12', [
          '--tw-rotate-z: 12deg',
          webkitLegacyTransformDeclaration,
          legacyTransformDeclaration,
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp('-rotate-z-45', [
          '--tw-rotate-z: -45deg',
          webkitLegacyTransformDeclaration,
          legacyTransformDeclaration,
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp('rotate-z-\\[0\\.4turn\\]', [
          '--tw-rotate-z: 0.4turn',
          webkitLegacyTransformDeclaration,
          legacyTransformDeclaration,
        ]),
      )

      expect(css).toMatch(
        cssClassRegExp('skew-x-0', [
          '--tw-skew-x: 0deg',
          webkitLegacyTransformDeclaration,
          legacyTransformDeclaration,
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp('skew-x-12', [
          '--tw-skew-x: 12deg',
          webkitLegacyTransformDeclaration,
          legacyTransformDeclaration,
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp('-skew-x-3', [
          '--tw-skew-x: -3deg',
          webkitLegacyTransformDeclaration,
          legacyTransformDeclaration,
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp('skew-x-\\[23deg\\]', [
          '--tw-skew-x: 23deg',
          webkitLegacyTransformDeclaration,
          legacyTransformDeclaration,
        ]),
      )

      expect(css).toMatch(
        cssClassRegExp('skew-y-0', [
          '--tw-skew-y: 0deg',
          webkitLegacyTransformDeclaration,
          legacyTransformDeclaration,
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp('skew-y-12', [
          '--tw-skew-y: 12deg',
          webkitLegacyTransformDeclaration,
          legacyTransformDeclaration,
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp('-skew-y-3', [
          '--tw-skew-y: -3deg',
          webkitLegacyTransformDeclaration,
          legacyTransformDeclaration,
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp('skew-y-\\[23deg\\]', [
          '--tw-skew-y: 23deg',
          webkitLegacyTransformDeclaration,
          legacyTransformDeclaration,
        ]),
      )
    })
  })
})
