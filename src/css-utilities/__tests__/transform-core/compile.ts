import { compileCSS, cssClassRegExp } from '../../../../jest/utils'

const testClassNames = [
  'transform',
  'transform-cpu',
  'transform-gpu',
  'transform-none',
]
const testElements = testClassNames
  .map((className) => `<div class="${className}"></div>`)
  .join('')

describe('css-utilities', () => {
  describe('TransformCore', () => {
    it('compiles', async () => {
      const css = await compileCSS(testElements)

      expect(css).toMatch(
        cssClassRegExp('transform', [
          '--webkit-transform: skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))',
          'transform: skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))',
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('transform-cpu', [
          'translate: var(--tw-translate-x) var(--tw-translate-y)',
          'scale: var(--tw-scale-x) var(--tw-scale-y)',
          '--webkit-transform: skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))',
          'transform: skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))',
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('transform-gpu', [
          'translate: var(--tw-translate-x) var(--tw-translate-y) var(--tw-translate-z)',
          'scale: var(--tw-scale-x) var(--tw-scale-y) var(--tw-scale-z)',
          '--webkit-transform: rotateX(var(--tw-rotate-x)) rotateY(var(--tw-rotate-y)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))',
          'transform: rotateX(var(--tw-rotate-x)) rotateY(var(--tw-rotate-y)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))',
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('transform-none', [
          'translate: none',
          'scale: none',
          '--webkit-transform: none',
          'transform: none',
        ])
      )
    })
  })
})
