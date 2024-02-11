import { type CSSUtility } from '@/css-utilities'
import { Base } from '@/css-utilities/base'
import { Transform } from '@/css-utilities/transform'
import { normaliseLengthValue, type UnsafeCSSValue } from '@/utils/css-value'
import { type Dimension, normaliseDimension } from '@/utils/dimension'

interface NormaliseFunctionValuesOptions {
  dimension?: Dimension
  perspective?: UnsafeCSSValue
}

interface PerspectiveDeclarations {
  perspective: string
}

export class Perspective extends Base implements CSSUtility {
  static defaultTheme = {
    none: 'none',
    250: '250px',
    500: '500px',
    750: '750px',
    1000: '1000px',
  }
  static defaultFunctionValues: Required<
    Omit<NormaliseFunctionValuesOptions, 'dimension'>
  > = {
    perspective: 'var(--tw-perspective)',
  }

  static normaliseFunctionValues = ({
    dimension,
    perspective,
  }: NormaliseFunctionValuesOptions = {}): string => {
    if (normaliseDimension(dimension) === '2d') {
      return 'none'
    }

    return normaliseLengthValue(
      perspective,
      Perspective.defaultFunctionValues.perspective,
    )
  }

  static declarations = (
    values: NormaliseFunctionValuesOptions = {},
  ): PerspectiveDeclarations => ({
    perspective: Perspective.normaliseFunctionValues(values),
  })

  static legacyDeclarations = () => Transform.legacyDeclarations()

  public utilities = () => {
    const cssDeclarations = this.legacy
      ? Perspective.legacyDeclarations()
      : Perspective.declarations()

    this.api.matchUtilities(
      {
        perspective: (value) => ({
          '@defaults transform': {},
          '--tw-perspective': value,
          ...cssDeclarations,
        }),
      },
      {
        values: this.api.theme('perspective'),
        supportsNegativeValues: true,
      },
    )
  }
}
