import {
  compileCSS,
  cssClassRegExp,
  cssKeyframesRegExp,
  legacyTransform3DValue,
} from '../../../../jest/utils'

const testClassNames = [
  'animate-spin-x',
  'animate-spin-x-2',
  '-animate-spin-x-4',
  'animate-spin-y',
  'animate-spin-y-2',
  '-animate-spin-y-4',
  'animate-spin-z',
  'animate-spin-z-2',
  '-animate-spin-z-4',
]
const testElements = testClassNames
  .map((className) => `<div class="${className}"></div>`)
  .join('')

describe('css-animations', () => {
  describe('Spin', () => {
    it('compiles', async () => {
      const css = await compileCSS(testElements)

      expect(css).toMatch(
        cssKeyframesRegExp('spin-x', [
          [
            'from',
            [
              '--webkit-transform: rotateX(0deg) rotateY(var(--tw-rotate-y)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))',
              'transform: rotateX(0deg) rotateY(var(--tw-rotate-y)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))',
            ],
          ],
          [
            'to',
            [
              '--webkit-transform: rotateX(360deg) rotateY(var(--tw-rotate-y)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))',
              'transform: rotateX(360deg) rotateY(var(--tw-rotate-y)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))',
            ],
          ],
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp(
          'animate-spin-x',
          'animation: spin-x 1s linear infinite',
        ),
      )

      expect(css).toMatch(
        cssClassRegExp(
          'animate-spin-x-2',
          'animation: spin-x 2s linear infinite',
        ),
      )

      expect(css).toMatch(
        cssKeyframesRegExp('-spin-x', [
          [
            'from',
            [
              '--webkit-transform: rotateX(0deg) rotateY(var(--tw-rotate-y)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))',
              'transform: rotateX(0deg) rotateY(var(--tw-rotate-y)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))',
            ],
          ],
          [
            'to',
            [
              '--webkit-transform: rotateX(-360deg) rotateY(var(--tw-rotate-y)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))',
              'transform: rotateX(-360deg) rotateY(var(--tw-rotate-y)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))',
            ],
          ],
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp(
          '-animate-spin-x-4',
          'animation: -spin-x 4s linear infinite',
        ),
      )

      expect(css).toMatch(
        cssKeyframesRegExp('spin-y', [
          [
            'from',
            [
              '--webkit-transform: rotateX(var(--tw-rotate-x)) rotateY(0deg) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))',
              'transform: rotateX(var(--tw-rotate-x)) rotateY(0deg) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))',
            ],
          ],
          [
            'to',
            [
              '--webkit-transform: rotateX(var(--tw-rotate-x)) rotateY(360deg) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))',
              'transform: rotateX(var(--tw-rotate-x)) rotateY(360deg) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))',
            ],
          ],
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp(
          'animate-spin-y',
          'animation: spin-y 1s linear infinite',
        ),
      )

      expect(css).toMatch(
        cssClassRegExp(
          'animate-spin-y-2',
          'animation: spin-y 2s linear infinite',
        ),
      )

      expect(css).toMatch(
        cssKeyframesRegExp('-spin-y', [
          [
            'from',
            [
              '--webkit-transform: rotateX(var(--tw-rotate-x)) rotateY(0deg) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))',
              'transform: rotateX(var(--tw-rotate-x)) rotateY(0deg) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))',
            ],
          ],
          [
            'to',
            [
              '--webkit-transform: rotateX(var(--tw-rotate-x)) rotateY(-360deg) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))',
              'transform: rotateX(var(--tw-rotate-x)) rotateY(-360deg) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))',
            ],
          ],
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp(
          '-animate-spin-y-4',
          'animation: -spin-y 4s linear infinite',
        ),
      )

      expect(css).toMatch(
        cssKeyframesRegExp('spin-z', [
          ['from', 'rotate: 0deg'],
          ['to', 'rotate: 360deg'],
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp(
          'animate-spin-z',
          'animation: spin-z 1s linear infinite',
        ),
      )

      expect(css).toMatch(
        cssClassRegExp(
          'animate-spin-z-2',
          'animation: spin-z 2s linear infinite',
        ),
      )

      expect(css).toMatch(
        cssKeyframesRegExp('-spin-z', [
          ['from', 'rotate: 0deg'],
          ['to', 'rotate: -360deg'],
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp(
          '-animate-spin-z-4',
          'animation: -spin-z 4s linear infinite',
        ),
      )
    })

    it('compiles legacy', async () => {
      const css = await compileCSS(testElements, true)

      let transformValuesFrom = legacyTransform3DValue({ rotateX: '0deg' })
      let transformValuesTo = legacyTransform3DValue({ rotateX: '360deg' })
      expect(css).toMatch(
        cssKeyframesRegExp('spin-x', [
          [
            'from',
            [
              `--webkit-transform: ${transformValuesFrom}`,
              `transform: ${transformValuesFrom}`,
            ],
          ],
          [
            'to',
            [
              `--webkit-transform: ${transformValuesTo}`,
              `transform: ${transformValuesTo}`,
            ],
          ],
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp(
          'animate-spin-x',
          'animation: spin-x 1s linear infinite',
        ),
      )

      expect(css).toMatch(
        cssClassRegExp(
          'animate-spin-x-2',
          'animation: spin-x 2s linear infinite',
        ),
      )

      transformValuesTo = legacyTransform3DValue({ rotateX: '-360deg' })
      expect(css).toMatch(
        cssKeyframesRegExp('-spin-x', [
          [
            'from',
            [
              `--webkit-transform: ${transformValuesFrom}`,
              `transform: ${transformValuesFrom}`,
            ],
          ],
          [
            'to',
            [
              `--webkit-transform: ${transformValuesTo}`,
              `transform: ${transformValuesTo}`,
            ],
          ],
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp(
          '-animate-spin-x-4',
          'animation: -spin-x 4s linear infinite',
        ),
      )

      transformValuesFrom = legacyTransform3DValue({ rotateY: '0deg' })
      transformValuesTo = legacyTransform3DValue({ rotateY: '360deg' })
      expect(css).toMatch(
        cssKeyframesRegExp('spin-y', [
          [
            'from',
            [
              `--webkit-transform: ${transformValuesFrom}`,
              `transform: ${transformValuesFrom}`,
            ],
          ],
          [
            'to',
            [
              `--webkit-transform: ${transformValuesTo}`,
              `transform: ${transformValuesTo}`,
            ],
          ],
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp(
          'animate-spin-y',
          'animation: spin-y 1s linear infinite',
        ),
      )

      expect(css).toMatch(
        cssClassRegExp(
          'animate-spin-y-2',
          'animation: spin-y 2s linear infinite',
        ),
      )

      transformValuesTo = legacyTransform3DValue({ rotateY: '-360deg' })
      expect(css).toMatch(
        cssKeyframesRegExp('-spin-y', [
          [
            'from',
            [
              `--webkit-transform: ${transformValuesFrom}`,
              `transform: ${transformValuesFrom}`,
            ],
          ],
          [
            'to',
            [
              `--webkit-transform: ${transformValuesTo}`,
              `transform: ${transformValuesTo}`,
            ],
          ],
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp(
          '-animate-spin-y-4',
          'animation: -spin-y 4s linear infinite',
        ),
      )

      transformValuesFrom = legacyTransform3DValue({ rotateZ: '0deg' })
      transformValuesTo = legacyTransform3DValue({ rotateZ: '360deg' })
      expect(css).toMatch(
        cssKeyframesRegExp('spin-z', [
          [
            'from',
            [
              `--webkit-transform: ${transformValuesFrom}`,
              `transform: ${transformValuesFrom}`,
            ],
          ],
          [
            'to',
            [
              `--webkit-transform: ${transformValuesTo}`,
              `transform: ${transformValuesTo}`,
            ],
          ],
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp(
          'animate-spin-z',
          'animation: spin-z 1s linear infinite',
        ),
      )

      expect(css).toMatch(
        cssClassRegExp(
          'animate-spin-z-2',
          'animation: spin-z 2s linear infinite',
        ),
      )

      transformValuesTo = legacyTransform3DValue({ rotateZ: '-360deg' })
      expect(css).toMatch(
        cssKeyframesRegExp('-spin-z', [
          [
            'from',
            [
              `--webkit-transform: ${transformValuesFrom}`,
              `transform: ${transformValuesFrom}`,
            ],
          ],
          [
            'to',
            [
              `--webkit-transform: ${transformValuesTo}`,
              `transform: ${transformValuesTo}`,
            ],
          ],
        ]),
      )
      expect(css).toMatch(
        cssClassRegExp(
          '-animate-spin-z-4',
          'animation: -spin-z 4s linear infinite',
        ),
      )
    })
  })
})
