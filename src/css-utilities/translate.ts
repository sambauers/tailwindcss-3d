import type { CSSUtility } from '@/css-utilities'
import type { LocalPluginAPI } from '@/common'
import type { Dimension } from '@/utils/dimension'
import type { UnsafeCSSValue } from '@/utils/css-value'
import { generateGuard } from '@/utils/generate-guard'
import _ from 'lodash'
import {
  normaliseLengthPercentageValue,
  normaliseLengthValue,
} from '@/utils/css-value'
import { normaliseDimension } from '@/utils/dimension'

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

class Translate implements CSSUtility {
  private isProcessableValue = generateGuard<ProcessableValue>(
    _.isString,
    _.isUndefined
  )

  private isProcessableValues = generateGuard<ProcessableValues>([
    _.isPlainObject,
    (maybe) => _.every(_.keys(maybe), _.isString),
    (maybe) => _.every(_.values(maybe), this.isProcessableValue),
  ])

  private isValues = generateGuard<Values>([
    _.isPlainObject,
    (maybe) => _.every(_.keys(maybe), _.isString),
    (maybe) => _.every(_.values(maybe), _.isString),
  ])

  private normaliseValues = (values: unknown): Values =>
    this.isProcessableValues(values)
      ? _.chain(values)
          .mapValues((duration) => normaliseLengthPercentageValue(duration))
          .pickBy(
            (duration, modifier): duration is Value =>
              _.isString(modifier) && modifier !== '' && _.isString(duration)
          )
          .value()
      : {}

  private defaultFunctionValues: Required<
    Omit<NormaliseFunctionValuesOptions, 'dimension'>
  > = {
    translateX: 'var(--tw-translate-x)',
    translateY: 'var(--tw-translate-y)',
    translateZ: 'var(--tw-translate-z)',
  }

  public normaliseFunctionValues = ({
    dimension,
    translateX,
    translateY,
    translateZ,
  }: NormaliseFunctionValuesOptions = {}): string => {
    const safeValues = [
      normaliseLengthPercentageValue(
        translateX,
        this.defaultFunctionValues.translateX
      ),
      normaliseLengthPercentageValue(
        translateY,
        this.defaultFunctionValues.translateY
      ),
    ]

    if (normaliseDimension(dimension) === '3d') {
      safeValues.push(
        normaliseLengthValue(translateZ, this.defaultFunctionValues.translateZ)
      )
    }

    return safeValues.join(' ')
  }

  public utilities = ({ matchUtilities, theme }: LocalPluginAPI) => {
    const functionValues = this.normaliseFunctionValues()
    const values = this.normaliseValues(theme('translate'))

    matchUtilities(
      {
        'translate-x': (value) => ({
          '@defaults transform': {},
          '--tw-translate-x': value,
          translate: functionValues,
        }),
        'translate-y': (value) => ({
          '@defaults transform': {},
          '--tw-translate-y': value,
          translate: functionValues,
        }),
      },
      {
        values,
        supportsNegativeValues: true,
      }
    )

    matchUtilities(
      {
        'translate-z': (value) => ({
          '@defaults transform': {},
          '--tw-translate-z': value,
          translate: functionValues,
        }),
      },
      {
        values: _.pickBy(values, (value) => !value.endsWith('%')),
        supportsNegativeValues: true,
      }
    )
  }
}

export const translate = new Translate()
