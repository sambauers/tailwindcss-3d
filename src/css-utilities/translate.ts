import { chain } from 'lodash'
import every from 'lodash/every'
import isPlainObject from 'lodash/isPlainObject'
import isString from 'lodash/isString'
import isUndefined from 'lodash/isUndefined'
import keys from 'lodash/keys'
import pickBy from 'lodash/pickBy'
import values from 'lodash/values'

import { type CSSUtility } from '@/css-utilities'
import { Base } from '@/css-utilities/base'
import { Transform } from '@/css-utilities/transform'
import {
  type UnsafeCSSValue,
  normaliseLengthPercentageValue,
  normaliseLengthValue,
} from '@/utils/css-value'
import { type Dimension, normaliseDimension } from '@/utils/dimension'
import { generateGuard } from '@/utils/generate-guard'

type ProcessableValue = string | undefined
type ProcessableValues = Record<string, ProcessableValue>
type Value = string
type Values = Record<string, Value>

interface NormaliseFunctionValuesOptions {
  dimension?: Dimension
  translateX?: UnsafeCSSValue
  translateY?: UnsafeCSSValue
  translateZ?: UnsafeCSSValue
}

interface TranslateDeclarations {
  translate: string
}

export class Translate extends Base implements CSSUtility {
  private isProcessableValue = generateGuard<ProcessableValue>(
    isString,
    isUndefined
  )

  private isProcessableValues = generateGuard<ProcessableValues>([
    isPlainObject,
    (maybe) => every(keys(maybe), isString),
    (maybe) => every(values(maybe), this.isProcessableValue),
  ])

  private normaliseValues = (values: unknown): Values =>
    this.isProcessableValues(values)
      ? chain(values)
          .mapValues((duration) => normaliseLengthPercentageValue(duration))
          .pickBy(
            (duration, modifier): duration is Value =>
              isString(modifier) && modifier !== '' && isString(duration)
          )
          .value()
      : {}

  static defaultFunctionValues: Required<
    Omit<NormaliseFunctionValuesOptions, 'dimension'>
  > = {
    translateX: 'var(--tw-translate-x)',
    translateY: 'var(--tw-translate-y)',
    translateZ: 'var(--tw-translate-z)',
  }

  static normaliseFunctionValues = ({
    dimension,
    translateX,
    translateY,
    translateZ,
  }: NormaliseFunctionValuesOptions = {}): string => {
    const safeValues = [
      normaliseLengthPercentageValue(
        translateX,
        Translate.defaultFunctionValues.translateX
      ),
      normaliseLengthPercentageValue(
        translateY,
        Translate.defaultFunctionValues.translateY
      ),
    ]

    if (normaliseDimension(dimension) === '3d') {
      safeValues.push(
        normaliseLengthValue(
          translateZ,
          Translate.defaultFunctionValues.translateZ
        )
      )
    }

    return safeValues.join(' ')
  }

  static declarations = (
    values: NormaliseFunctionValuesOptions = {}
  ): TranslateDeclarations => ({
    translate: Translate.normaliseFunctionValues(values),
  })

  static legacyDeclarations = () => Transform.legacyDeclarations()

  public utilities = () => {
    const values = this.normaliseValues(this.api.theme('translate'))
    const cssDeclarations = this.legacy
      ? Translate.legacyDeclarations()
      : Translate.declarations()

    this.api.matchUtilities(
      {
        'translate-x': (value) => ({
          '@defaults transform': {},
          '--tw-translate-x': value,
          ...cssDeclarations,
        }),
        'translate-y': (value) => ({
          '@defaults transform': {},
          '--tw-translate-y': value,
          ...cssDeclarations,
        }),
      },
      {
        values,
        supportsNegativeValues: true,
      }
    )

    this.api.matchUtilities(
      {
        'translate-z': (value) => ({
          '@defaults transform': {},
          '--tw-translate-z': value,
          ...cssDeclarations,
        }),
      },
      {
        values: pickBy(values, (value) => !value.endsWith('%')),
        supportsNegativeValues: true,
      }
    )
  }
}
