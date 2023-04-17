import {
  compileCSS,
  cssClassRegExp,
  cssKeyframesRegExp,
  legacyTransform3DValue,
} from '../../../../jest/utils'

const testClassNames = [
  'animate-bounce-x',
  'animate-bounce-x-2',
  '-animate-bounce-x-4',
  'animate-bounce-y',
  'animate-bounce-y-2',
  '-animate-bounce-y-4',
  'animate-bounce-z',
  'animate-bounce-z-2',
  '-animate-bounce-z-4',
]
const testElements = testClassNames
  .map((className) => `<div class="${className}"></div>`)
  .join('')

describe('css-animations', () => {
  describe('Bounce', () => {
    it('compiles', async () => {
      const css = await compileCSS(testElements)

      expect(css).toMatch(
        cssKeyframesRegExp('bounce-x', [
          [
            '0%, 100%',
            [
              'translate: 0.25rem var(--tw-translate-y) var(--tw-translate-z)',
              'animation-timing-function: cubic-bezier(0.5, 0, 1, 1)',
            ],
          ],
          [
            '50%',
            [
              'translate: 0px var(--tw-translate-y) var(--tw-translate-z)',
              'animation-timing-function: cubic-bezier(0, 0, 0.5, 1)',
            ],
          ],
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('animate-bounce-x', 'animation: bounce-x 1s infinite')
      )

      expect(css).toMatch(
        cssKeyframesRegExp('bounce-x-2', [
          [
            '0%, 100%',
            [
              'translate: 0.5rem var(--tw-translate-y) var(--tw-translate-z)',
              'animation-timing-function: cubic-bezier(0.5, 0, 1, 1)',
            ],
          ],
          [
            '50%',
            [
              'translate: 0px var(--tw-translate-y) var(--tw-translate-z)',
              'animation-timing-function: cubic-bezier(0, 0, 0.5, 1)',
            ],
          ],
        ])
      )
      expect(css).toMatch(
        cssClassRegExp(
          'animate-bounce-x-2',
          'animation: bounce-x-2 1.19s infinite'
        )
      )

      expect(css).toMatch(
        cssKeyframesRegExp('-bounce-x-4', [
          [
            '0%, 100%',
            [
              'translate: -1rem var(--tw-translate-y) var(--tw-translate-z)',
              'animation-timing-function: cubic-bezier(0.5, 0, 1, 1)',
            ],
          ],
          [
            '50%',
            [
              'translate: 0px var(--tw-translate-y) var(--tw-translate-z)',
              'animation-timing-function: cubic-bezier(0, 0, 0.5, 1)',
            ],
          ],
        ])
      )
      expect(css).toMatch(
        cssClassRegExp(
          '-animate-bounce-x-4',
          'animation: -bounce-x-4 1.41s infinite'
        )
      )

      expect(css).toMatch(
        cssKeyframesRegExp('bounce-y', [
          [
            '0%, 100%',
            [
              'translate: var(--tw-translate-x) 0.25rem var(--tw-translate-z)',
              'animation-timing-function: cubic-bezier(0.5, 0, 1, 1)',
            ],
          ],
          [
            '50%',
            [
              'translate: var(--tw-translate-x) 0px var(--tw-translate-z)',
              'animation-timing-function: cubic-bezier(0, 0, 0.5, 1)',
            ],
          ],
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('animate-bounce-y', 'animation: bounce-y 1s infinite')
      )

      expect(css).toMatch(
        cssKeyframesRegExp('bounce-y-2', [
          [
            '0%, 100%',
            [
              'translate: var(--tw-translate-x) 0.5rem var(--tw-translate-z)',
              'animation-timing-function: cubic-bezier(0.5, 0, 1, 1)',
            ],
          ],
          [
            '50%',
            [
              'translate: var(--tw-translate-x) 0px var(--tw-translate-z)',
              'animation-timing-function: cubic-bezier(0, 0, 0.5, 1)',
            ],
          ],
        ])
      )
      expect(css).toMatch(
        cssClassRegExp(
          'animate-bounce-y-2',
          'animation: bounce-y-2 1.19s infinite'
        )
      )

      expect(css).toMatch(
        cssKeyframesRegExp('-bounce-y-4', [
          [
            '0%, 100%',
            [
              'translate: var(--tw-translate-x) -1rem var(--tw-translate-z)',
              'animation-timing-function: cubic-bezier(0.5, 0, 1, 1)',
            ],
          ],
          [
            '50%',
            [
              'translate: var(--tw-translate-x) 0px var(--tw-translate-z)',
              'animation-timing-function: cubic-bezier(0, 0, 0.5, 1)',
            ],
          ],
        ])
      )
      expect(css).toMatch(
        cssClassRegExp(
          '-animate-bounce-y-4',
          'animation: -bounce-y-4 1.41s infinite'
        )
      )

      expect(css).toMatch(
        cssKeyframesRegExp('bounce-z', [
          [
            '0%, 100%',
            [
              'translate: var(--tw-translate-x) var(--tw-translate-y) 0.25rem',
              'animation-timing-function: cubic-bezier(0.5, 0, 1, 1)',
            ],
          ],
          [
            '50%',
            [
              'translate: var(--tw-translate-x) var(--tw-translate-y) 0px',
              'animation-timing-function: cubic-bezier(0, 0, 0.5, 1)',
            ],
          ],
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('animate-bounce-z', 'animation: bounce-z 1s infinite')
      )

      expect(css).toMatch(
        cssKeyframesRegExp('bounce-z-2', [
          [
            '0%, 100%',
            [
              'translate: var(--tw-translate-x) var(--tw-translate-y) 0.5rem',
              'animation-timing-function: cubic-bezier(0.5, 0, 1, 1)',
            ],
          ],
          [
            '50%',
            [
              'translate: var(--tw-translate-x) var(--tw-translate-y) 0px',
              'animation-timing-function: cubic-bezier(0, 0, 0.5, 1)',
            ],
          ],
        ])
      )
      expect(css).toMatch(
        cssClassRegExp(
          'animate-bounce-z-2',
          'animation: bounce-z-2 1.19s infinite'
        )
      )

      expect(css).toMatch(
        cssKeyframesRegExp('-bounce-z-4', [
          [
            '0%, 100%',
            [
              'translate: var(--tw-translate-x) var(--tw-translate-y) -1rem',
              'animation-timing-function: cubic-bezier(0.5, 0, 1, 1)',
            ],
          ],
          [
            '50%',
            [
              'translate: var(--tw-translate-x) var(--tw-translate-y) 0px',
              'animation-timing-function: cubic-bezier(0, 0, 0.5, 1)',
            ],
          ],
        ])
      )
      expect(css).toMatch(
        cssClassRegExp(
          '-animate-bounce-z-4',
          'animation: -bounce-z-4 1.41s infinite'
        )
      )
    })

    it('compiles legacy', async () => {
      const css = await compileCSS(testElements, true)

      let transformValuesA = legacyTransform3DValue({
        translate3d: '0.25rem, var(--tw-translate-y), var(--tw-translate-z)',
      })
      let transformValuesB = legacyTransform3DValue({
        translate3d: '0px, var(--tw-translate-y), var(--tw-translate-z)',
      })
      expect(css).toMatch(
        cssKeyframesRegExp('bounce-x', [
          [
            '0%, 100%',
            [
              `--webkit-transform: ${transformValuesA}`,
              `transform: ${transformValuesA}`,
              'animation-timing-function: cubic-bezier(0.5, 0, 1, 1)',
            ],
          ],
          [
            '50%',
            [
              `--webkit-transform: ${transformValuesB}`,
              `transform: ${transformValuesB}`,
              'animation-timing-function: cubic-bezier(0, 0, 0.5, 1)',
            ],
          ],
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('animate-bounce-x', 'animation: bounce-x 1s infinite')
      )

      transformValuesA = legacyTransform3DValue({
        translate3d: '0.5rem, var(--tw-translate-y), var(--tw-translate-z)',
      })
      expect(css).toMatch(
        cssKeyframesRegExp('bounce-x-2', [
          [
            '0%, 100%',
            [
              `--webkit-transform: ${transformValuesA}`,
              `transform: ${transformValuesA}`,
              'animation-timing-function: cubic-bezier(0.5, 0, 1, 1)',
            ],
          ],
          [
            '50%',
            [
              `--webkit-transform: ${transformValuesB}`,
              `transform: ${transformValuesB}`,
              'animation-timing-function: cubic-bezier(0, 0, 0.5, 1)',
            ],
          ],
        ])
      )
      expect(css).toMatch(
        cssClassRegExp(
          'animate-bounce-x-2',
          'animation: bounce-x-2 1.19s infinite'
        )
      )

      transformValuesA = legacyTransform3DValue({
        translate3d: '-1rem, var(--tw-translate-y), var(--tw-translate-z)',
      })
      expect(css).toMatch(
        cssKeyframesRegExp('-bounce-x-4', [
          [
            '0%, 100%',
            [
              `--webkit-transform: ${transformValuesA}`,
              `transform: ${transformValuesA}`,
              'animation-timing-function: cubic-bezier(0.5, 0, 1, 1)',
            ],
          ],
          [
            '50%',
            [
              `--webkit-transform: ${transformValuesB}`,
              `transform: ${transformValuesB}`,
              'animation-timing-function: cubic-bezier(0, 0, 0.5, 1)',
            ],
          ],
        ])
      )
      expect(css).toMatch(
        cssClassRegExp(
          '-animate-bounce-x-4',
          'animation: -bounce-x-4 1.41s infinite'
        )
      )

      transformValuesA = legacyTransform3DValue({
        translate3d: 'var(--tw-translate-x), 0.25rem, var(--tw-translate-z)',
      })
      transformValuesB = legacyTransform3DValue({
        translate3d: 'var(--tw-translate-x), 0px, var(--tw-translate-z)',
      })
      expect(css).toMatch(
        cssKeyframesRegExp('bounce-y', [
          [
            '0%, 100%',
            [
              `--webkit-transform: ${transformValuesA}`,
              `transform: ${transformValuesA}`,
              'animation-timing-function: cubic-bezier(0.5, 0, 1, 1)',
            ],
          ],
          [
            '50%',
            [
              `--webkit-transform: ${transformValuesB}`,
              `transform: ${transformValuesB}`,
              'animation-timing-function: cubic-bezier(0, 0, 0.5, 1)',
            ],
          ],
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('animate-bounce-y', 'animation: bounce-y 1s infinite')
      )

      transformValuesA = legacyTransform3DValue({
        translate3d: 'var(--tw-translate-x), 0.5rem, var(--tw-translate-z)',
      })
      expect(css).toMatch(
        cssKeyframesRegExp('bounce-y-2', [
          [
            '0%, 100%',
            [
              `--webkit-transform: ${transformValuesA}`,
              `transform: ${transformValuesA}`,
              'animation-timing-function: cubic-bezier(0.5, 0, 1, 1)',
            ],
          ],
          [
            '50%',
            [
              `--webkit-transform: ${transformValuesB}`,
              `transform: ${transformValuesB}`,
              'animation-timing-function: cubic-bezier(0, 0, 0.5, 1)',
            ],
          ],
        ])
      )
      expect(css).toMatch(
        cssClassRegExp(
          'animate-bounce-y-2',
          'animation: bounce-y-2 1.19s infinite'
        )
      )

      transformValuesA = legacyTransform3DValue({
        translate3d: 'var(--tw-translate-x), -1rem, var(--tw-translate-z)',
      })
      expect(css).toMatch(
        cssKeyframesRegExp('-bounce-y-4', [
          [
            '0%, 100%',
            [
              `--webkit-transform: ${transformValuesA}`,
              `transform: ${transformValuesA}`,
              'animation-timing-function: cubic-bezier(0.5, 0, 1, 1)',
            ],
          ],
          [
            '50%',
            [
              `--webkit-transform: ${transformValuesB}`,
              `transform: ${transformValuesB}`,
              'animation-timing-function: cubic-bezier(0, 0, 0.5, 1)',
            ],
          ],
        ])
      )
      expect(css).toMatch(
        cssClassRegExp(
          '-animate-bounce-y-4',
          'animation: -bounce-y-4 1.41s infinite'
        )
      )

      transformValuesA = legacyTransform3DValue({
        translate3d: 'var(--tw-translate-x), var(--tw-translate-y), 0.25rem',
      })
      transformValuesB = legacyTransform3DValue({
        translate3d: 'var(--tw-translate-x), var(--tw-translate-y), 0px',
      })
      expect(css).toMatch(
        cssKeyframesRegExp('bounce-z', [
          [
            '0%, 100%',
            [
              `--webkit-transform: ${transformValuesA}`,
              `transform: ${transformValuesA}`,
              'animation-timing-function: cubic-bezier(0.5, 0, 1, 1)',
            ],
          ],
          [
            '50%',
            [
              `--webkit-transform: ${transformValuesB}`,
              `transform: ${transformValuesB}`,
              'animation-timing-function: cubic-bezier(0, 0, 0.5, 1)',
            ],
          ],
        ])
      )
      expect(css).toMatch(
        cssClassRegExp('animate-bounce-z', 'animation: bounce-z 1s infinite')
      )

      transformValuesA = legacyTransform3DValue({
        translate3d: 'var(--tw-translate-x), var(--tw-translate-y), 0.5rem',
      })
      expect(css).toMatch(
        cssKeyframesRegExp('bounce-z-2', [
          [
            '0%, 100%',
            [
              `--webkit-transform: ${transformValuesA}`,
              `transform: ${transformValuesA}`,
              'animation-timing-function: cubic-bezier(0.5, 0, 1, 1)',
            ],
          ],
          [
            '50%',
            [
              `--webkit-transform: ${transformValuesB}`,
              `transform: ${transformValuesB}`,
              'animation-timing-function: cubic-bezier(0, 0, 0.5, 1)',
            ],
          ],
        ])
      )
      expect(css).toMatch(
        cssClassRegExp(
          'animate-bounce-z-2',
          'animation: bounce-z-2 1.19s infinite'
        )
      )

      transformValuesA = legacyTransform3DValue({
        translate3d: 'var(--tw-translate-x), var(--tw-translate-y), -1rem',
      })
      expect(css).toMatch(
        cssKeyframesRegExp('-bounce-z-4', [
          [
            '0%, 100%',
            [
              `--webkit-transform: ${transformValuesA}`,
              `transform: ${transformValuesA}`,
              'animation-timing-function: cubic-bezier(0.5, 0, 1, 1)',
            ],
          ],
          [
            '50%',
            [
              `--webkit-transform: ${transformValuesB}`,
              `transform: ${transformValuesB}`,
              'animation-timing-function: cubic-bezier(0, 0, 0.5, 1)',
            ],
          ],
        ])
      )
      expect(css).toMatch(
        cssClassRegExp(
          '-animate-bounce-z-4',
          'animation: -bounce-z-4 1.41s infinite'
        )
      )
    })
  })
})
