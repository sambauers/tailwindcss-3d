import {
  compileCSS,
  cssClassRegExp,
  legacyTransform3DValue,
} from '../../../../jest/utils'

const testClassNames = [
  'scale-0',
  'scale-50',
  'scale-[1.8]',
  'scale3d-0',
  'scale3d-50',
  'scale3d-[1.8]',
  'scale-x-0',
  'scale-x-50',
  'scale-x-[1.8]',
  'scale-y-0',
  'scale-y-50',
  'scale-y-[1.8]',
  'scale-z-0',
  'scale-z-50',
  'scale-z-[1.8]',
]
const testElements = testClassNames
  .map((className) => `<div class="${className}"></div>`)
  .join('')

const scaleDeclaration =
  'scale: var(--tw-scale-x) var(--tw-scale-y) var(--tw-scale-z)'
const legacyTransformDeclaration = `--webkit-transform: ${legacyTransform3DValue()}`
const transformDeclaration = `transform: ${legacyTransform3DValue()}`

describe('css-utilities', () => {
  describe('Scale', () => {
    it('compiles', async () => {
      const css = await compileCSS(testElements)

      expect(css).toMatch(
        cssClassRegExp('scale-0', [
          '--tw-scale-x: 0',
          '--tw-scale-y: 0',
          scaleDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('scale-50', [
          '--tw-scale-x: 0.5',
          '--tw-scale-y: 0.5',
          scaleDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('scale-\\[1\\.8\\]', [
          '--tw-scale-x: 1.8',
          '--tw-scale-y: 1.8',
          scaleDeclaration,
        ])
      )

      expect(css).toMatch(
        cssClassRegExp('scale3d-0', [
          '--tw-scale-x: 0',
          '--tw-scale-y: 0',
          '--tw-scale-z: 0',
          scaleDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('scale3d-50', [
          '--tw-scale-x: 0.5',
          '--tw-scale-y: 0.5',
          '--tw-scale-z: 0.5',
          scaleDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('scale3d-\\[1\\.8\\]', [
          '--tw-scale-x: 1.8',
          '--tw-scale-y: 1.8',
          '--tw-scale-z: 1.8',
          scaleDeclaration,
        ])
      )

      expect(css).toMatch(
        cssClassRegExp('scale-x-0', ['--tw-scale-x: 0', scaleDeclaration])
      )
      expect(css).toMatch(
        cssClassRegExp('scale-x-50', ['--tw-scale-x: 0.5', scaleDeclaration])
      )
      expect(css).toMatch(
        cssClassRegExp('scale-x-\\[1\\.8\\]', [
          '--tw-scale-x: 1.8',
          scaleDeclaration,
        ])
      )

      expect(css).toMatch(
        cssClassRegExp('scale-y-0', ['--tw-scale-y: 0', scaleDeclaration])
      )
      expect(css).toMatch(
        cssClassRegExp('scale-y-50', ['--tw-scale-y: 0.5', scaleDeclaration])
      )
      expect(css).toMatch(
        cssClassRegExp('scale-y-\\[1\\.8\\]', [
          '--tw-scale-y: 1.8',
          scaleDeclaration,
        ])
      )

      expect(css).toMatch(
        cssClassRegExp('scale-z-0', ['--tw-scale-z: 0', scaleDeclaration])
      )
      expect(css).toMatch(
        cssClassRegExp('scale-z-50', ['--tw-scale-z: 0.5', scaleDeclaration])
      )
      expect(css).toMatch(
        cssClassRegExp('scale-z-\\[1\\.8\\]', [
          '--tw-scale-z: 1.8',
          scaleDeclaration,
        ])
      )
    })

    it('compiles legacy', async () => {
      const css = await compileCSS(testElements, true)

      expect(css).toMatch(
        cssClassRegExp('scale-0', [
          '--tw-scale-x: 0',
          '--tw-scale-y: 0',
          legacyTransformDeclaration,
          transformDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('scale-50', [
          '--tw-scale-x: 0.5',
          '--tw-scale-y: 0.5',
          legacyTransformDeclaration,
          transformDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('scale-\\[1\\.8\\]', [
          '--tw-scale-x: 1.8',
          '--tw-scale-y: 1.8',
          legacyTransformDeclaration,
          transformDeclaration,
        ])
      )

      expect(css).toMatch(
        cssClassRegExp('scale3d-0', [
          '--tw-scale-x: 0',
          '--tw-scale-y: 0',
          '--tw-scale-z: 0',
          legacyTransformDeclaration,
          transformDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('scale3d-50', [
          '--tw-scale-x: 0.5',
          '--tw-scale-y: 0.5',
          '--tw-scale-z: 0.5',
          legacyTransformDeclaration,
          transformDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('scale3d-\\[1\\.8\\]', [
          '--tw-scale-x: 1.8',
          '--tw-scale-y: 1.8',
          '--tw-scale-z: 1.8',
          legacyTransformDeclaration,
          transformDeclaration,
        ])
      )

      expect(css).toMatch(
        cssClassRegExp('scale-x-0', [
          '--tw-scale-x: 0',
          legacyTransformDeclaration,
          transformDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('scale-x-50', [
          '--tw-scale-x: 0.5',
          legacyTransformDeclaration,
          transformDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('scale-x-\\[1\\.8\\]', [
          '--tw-scale-x: 1.8',
          legacyTransformDeclaration,
          transformDeclaration,
        ])
      )

      expect(css).toMatch(
        cssClassRegExp('scale-y-0', [
          '--tw-scale-y: 0',
          legacyTransformDeclaration,
          transformDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('scale-y-50', [
          '--tw-scale-y: 0.5',
          legacyTransformDeclaration,
          transformDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('scale-y-\\[1\\.8\\]', [
          '--tw-scale-y: 1.8',
          legacyTransformDeclaration,
          transformDeclaration,
        ])
      )

      expect(css).toMatch(
        cssClassRegExp('scale-z-0', [
          '--tw-scale-z: 0',
          legacyTransformDeclaration,
          transformDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('scale-z-50', [
          '--tw-scale-z: 0.5',
          legacyTransformDeclaration,
          transformDeclaration,
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('scale-z-\\[1\\.8\\]', [
          '--tw-scale-z: 1.8',
          legacyTransformDeclaration,
          transformDeclaration,
        ])
      )
    })
  })
})
