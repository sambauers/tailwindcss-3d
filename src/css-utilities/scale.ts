import type { LocalPluginAPI } from '../common'
import type { Dimension } from '../utils/dimension'
import type { UnsafeCSSValue } from '../utils/css-value'
import { generateGuard } from '../utils/generate-guard'
import _ from 'lodash'
import { normaliseNumberPercentageValue } from '../utils/css-value'
import { normaliseDimension } from '../utils/dimension'

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

interface UtilitiesOptions {
  matchUtilities: LocalPluginAPI['matchUtilities']
  theme: LocalPluginAPI['theme']
}

class Scale {
  private isProcessableValue = generateGuard<ProcessableValue>(
    [_.isString],
    [_.isUndefined]
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
          .mapValues((length) =>
            normaliseNumberPercentageValue(length, '1', { lowerLimit: 0 })
          )
          .pickBy(
            (length, modifier): length is Value =>
              _.isString(modifier) && modifier !== '' && _.isString(length)
          )
          .value()
      : {}

  private defaultFunctionValues: Required<
    Omit<NormaliseFunctionValuesOptions, 'dimension'>
  > = {
    scaleX: 'var(--tw-scale-x)',
    scaleY: 'var(--tw-scale-y)',
    scaleZ: 'var(--tw-scale-z)',
  }

  public normaliseFunctionValues = ({
    dimension,
    scaleX,
    scaleY,
    scaleZ,
  }: NormaliseFunctionValuesOptions = {}): string => {
    const safeValues = [
      normaliseNumberPercentageValue(
        scaleX,
        this.defaultFunctionValues.scaleX,
        { lowerLimit: 0 }
      ),
      normaliseNumberPercentageValue(
        scaleY,
        this.defaultFunctionValues.scaleY,
        { lowerLimit: 0 }
      ),
    ]

    if (normaliseDimension(dimension) === '3d') {
      safeValues.push(
        normaliseNumberPercentageValue(
          scaleZ,
          this.defaultFunctionValues.scaleZ,
          { lowerLimit: 0 }
        )
      )
    }

    return safeValues.join(' ')
  }

  public utilities = ({ matchUtilities, theme }: UtilitiesOptions) => {
    const functionValues = this.normaliseFunctionValues()
    const values = this.normaliseValues(theme('scale'))

    matchUtilities(
      {
        scale: (value) => ({
          '@defaults transform': {},
          '--tw-scale-x': value,
          '--tw-scale-y': value,
          scale: functionValues,
        }),
        scale3d: (value) => ({
          '@defaults transform': {},
          '--tw-scale-x': value,
          '--tw-scale-y': value,
          '--tw-scale-z': value,
          scale: functionValues,
        }),
        'scale-x': (value) => ({
          '@defaults transform': {},
          '--tw-scale-x': value,
          scale: functionValues,
        }),
        'scale-y': (value) => ({
          '@defaults transform': {},
          '--tw-scale-y': value,
          scale: functionValues,
        }),
        'scale-z': (value) => ({
          '@defaults transform': {},
          '--tw-scale-z': value,
          scale: functionValues,
        }),
      },
      {
        values,
        supportsNegativeValues: true,
      }
    )
  }
}

export const scale = new Scale()
