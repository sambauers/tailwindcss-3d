import {
  compileCSS,
  cssClassRegExp,
  cssKeyframesRegExp,
  // legacyTransform3DValue,
} from '../../../../jest/utils'

const testClassNames = [
  'animate-bounce-and-spin-x',
  'animate-bounce-and-spin-y-2',
  '-animate-bounce-and-spin-z-4',
]
const testElements = testClassNames
  .map((className) => `<div class="${className}"></div>`)
  .join('')

describe('css-animations', () => {
  describe('BounceAndSpin', () => {
    it('compiles', async () => {
      const css = await compileCSS(testElements)

      expect(css).toMatch(
        cssKeyframesRegExp('bounce-and-spin-x', [
          [
            '0%, 100%',
            [
              'translate: 0px var(--tw-translate-y) var(--tw-translate-z)',
              'animation-timing-function: cubic-bezier(0, 0, 0.2, 1)',
            ],
          ],
          [
            '0%, 5%',
            [
              '--webkit-transform: rotateX(0deg) rotateY(var(--tw-rotate-y)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))',
              'transform: rotateX(0deg) rotateY(var(--tw-rotate-y)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))',
              'animation-timing-function: ease-in',
            ],
          ],
          [
            '50%',
            [
              'translate: 0.25rem var(--tw-translate-y) var(--tw-translate-z)',
              'animation-timing-function: cubic-bezier(0.8, 0, 1, 1)',
            ],
          ],
          [
            '50.1%',
            [
              '--webkit-transform: rotateX(180deg) rotateY(var(--tw-rotate-y)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))',
              'transform: rotateX(180deg) rotateY(var(--tw-rotate-y)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))',
              'animation-timing-function: linear',
            ],
          ],
          [
            '95%, 100%',
            [
              '--webkit-transform: rotateX(360deg) rotateY(var(--tw-rotate-y)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))',
              'transform: rotateX(360deg) rotateY(var(--tw-rotate-y)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))',
              'animation-timing-function: ease-out',
            ],
          ],
        ])
      )
      expect(css).toMatch(
        cssClassRegExp(
          'animate-bounce-and-spin-x',
          'animation: bounce-and-spin-x 1s infinite'
        )
      )

      expect(css).toMatch(
        cssKeyframesRegExp('bounce-and-spin-y-2', [
          [
            '0%, 100%',
            [
              'translate: var(--tw-translate-x) 0px var(--tw-translate-z)',
              'animation-timing-function: cubic-bezier(0, 0, 0.2, 1)',
            ],
          ],
          [
            '0%, 5%',
            [
              '--webkit-transform: rotateX(var(--tw-rotate-x)) rotateY(0deg) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))',
              'transform: rotateX(var(--tw-rotate-x)) rotateY(0deg) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))',
              'animation-timing-function: ease-in',
            ],
          ],
          [
            '50%',
            [
              'translate: var(--tw-translate-x) 0.5rem var(--tw-translate-z)',
              'animation-timing-function: cubic-bezier(0.8, 0, 1, 1)',
            ],
          ],
          [
            '50.1%',
            [
              '--webkit-transform: rotateX(var(--tw-rotate-x)) rotateY(180deg) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))',
              'transform: rotateX(var(--tw-rotate-x)) rotateY(180deg) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))',
              'animation-timing-function: linear',
            ],
          ],
          [
            '95%, 100%',
            [
              '--webkit-transform: rotateX(var(--tw-rotate-x)) rotateY(360deg) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))',
              'transform: rotateX(var(--tw-rotate-x)) rotateY(360deg) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))',
              'animation-timing-function: ease-out',
            ],
          ],
        ])
      )
      expect(css).toMatch(
        cssClassRegExp(
          'animate-bounce-and-spin-y-2',
          'animation: bounce-and-spin-y-2 1.19s infinite'
        )
      )

      expect(css).toMatch(
        cssKeyframesRegExp('-bounce-and-spin-z-4', [
          [
            '0%, 100%',
            [
              'translate: var(--tw-translate-x) var(--tw-translate-y) 0px',
              'animation-timing-function: cubic-bezier(0, 0, 0.2, 1)',
            ],
          ],
          ['0%, 5%', ['rotate: 0deg', 'animation-timing-function: ease-in']],
          [
            '50%',
            [
              'translate: var(--tw-translate-x) var(--tw-translate-y) -1rem',
              'animation-timing-function: cubic-bezier(0.8, 0, 1, 1)',
            ],
          ],
          ['50.1%', ['rotate: -180deg', 'animation-timing-function: linear']],
          [
            '95%, 100%',
            ['rotate: -360deg', 'animation-timing-function: ease-out'],
          ],
        ])
      )
      expect(css).toMatch(
        cssClassRegExp(
          '-animate-bounce-and-spin-z-4',
          'animation: -bounce-and-spin-z-4 1.41s infinite'
        )
      )
    })

    // There is no "legacy" version of BounceAndSpin
  })
})
