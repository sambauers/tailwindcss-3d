import {
  chain,
  every,
  isPlainObject,
  isString,
  isUndefined,
  keys,
  values,
} from 'lodash'

import { type CSSUtility } from '@/css-utilities'
import { Base } from '@/css-utilities/base'
import { Transform } from '@/css-utilities/transform'
import { type UnsafeCSSValue } from '@/utils/css-value'
import { normaliseNumberPercentageValue } from '@/utils/css-value'
import { normaliseDimension } from '@/utils/dimension'
import { type Dimension } from '@/utils/dimension'
import { generateGuard } from '@/utils/generate-guard'

type ProcessableValue = string | undefined
type ProcessableValues = Record<string, ProcessableValue>
type Value = string
type Values = Record<string, Value>

interface NormaliseFunctionValuesOptions {
  dimension?: Dimension
  scaleX?: UnsafeCSSValue
  scaleY?: UnsafeCSSValue
  scaleZ?: UnsafeCSSValue
}

interface ScaleDeclarations {
  scale: string
}

export class Scale extends Base implements CSSUtility {
  private isProcessableValue = generateGuard<ProcessableValue>(
    [isString],
    [isUndefined]
  )

  private isProcessableValues = generateGuard<ProcessableValues>([
    isPlainObject,
    (maybe) => every(keys(maybe), isString),
    (maybe) => every(values(maybe), this.isProcessableValue),
  ])

  private normaliseValues = (values: unknown): Values =>
    this.isProcessableValues(values)
      ? chain(values)
          .mapValues((length) =>
            normaliseNumberPercentageValue(length, '1', { lowerLimit: 0 })
          )
          .pickBy(
            (length, modifier): length is Value =>
              isString(modifier) && modifier !== '' && isString(length)
          )
          .value()
      : {}

  static defaultFunctionValues: Required<
    Omit<NormaliseFunctionValuesOptions, 'dimension'>
  > = {
    scaleX: 'var(--tw-scale-x)',
    scaleY: 'var(--tw-scale-y)',
    scaleZ: 'var(--tw-scale-z)',
  }

  static normaliseFunctionValues = ({
    dimension,
    scaleX,
    scaleY,
    scaleZ,
  }: NormaliseFunctionValuesOptions = {}): string => {
    const safeValues = [
      normaliseNumberPercentageValue(
        scaleX,
        Scale.defaultFunctionValues.scaleX,
        { lowerLimit: 0 }
      ),
      normaliseNumberPercentageValue(
        scaleY,
        Scale.defaultFunctionValues.scaleY,
        { lowerLimit: 0 }
      ),
    ]

    if (normaliseDimension(dimension) === '3d') {
      safeValues.push(
        normaliseNumberPercentageValue(
          scaleZ,
          Scale.defaultFunctionValues.scaleZ,
          { lowerLimit: 0 }
        )
      )
    }

    return safeValues.join(' ')
  }

  static declarations = (
    values: NormaliseFunctionValuesOptions = {}
  ): ScaleDeclarations => ({
    scale: Scale.normaliseFunctionValues(values),
  })

  static legacyDeclarations = () => Transform.legacyDeclarations()

  public utilities = () => {
    const values = this.normaliseValues(this.api.theme('scale'))
    const cssDeclarations = this.legacy
      ? Scale.legacyDeclarations()
      : Scale.declarations()

    this.api.matchUtilities(
      {
        scale: (value) => ({
          '@defaults transform': {},
          '--tw-scale-x': value,
          '--tw-scale-y': value,
          ...cssDeclarations,
        }),
        scale3d: (value) => ({
          '@defaults transform': {},
          '--tw-scale-x': value,
          '--tw-scale-y': value,
          '--tw-scale-z': value,
          ...cssDeclarations,
        }),
        'scale-x': (value) => ({
          '@defaults transform': {},
          '--tw-scale-x': value,
          ...cssDeclarations,
        }),
        'scale-y': (value) => ({
          '@defaults transform': {},
          '--tw-scale-y': value,
          ...cssDeclarations,
        }),
        'scale-z': (value) => ({
          '@defaults transform': {},
          '--tw-scale-z': value,
          ...cssDeclarations,
        }),
      },
      {
        values,
        supportsNegativeValues: true,
      }
    )
  }
}
