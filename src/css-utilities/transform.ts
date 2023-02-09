import type { CSSUtility } from '@/css-utilities'
import type { LocalPluginAPI } from '@/common'
import type { Dimension } from '@/utils/dimension'
import type { UnsafeCSSValue } from '@/utils/css-value'
import { normaliseDimension } from '@/utils/dimension'
import { normaliseAngleValue } from '@/utils/css-value'
import _ from 'lodash'
import { generateGuard } from '@/utils/generate-guard'

type ProcessableValue = string | undefined
type ProcessableValues = Record<string, ProcessableValue>
type Value = string
type Values = Record<string, Value>

interface NormaliseFunctionValuesOptions {
  dimension?: Dimension
  rotateX?: UnsafeCSSValue
  rotateY?: UnsafeCSSValue
  skewX?: UnsafeCSSValue
  skewY?: UnsafeCSSValue
}

class Transform implements CSSUtility {
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
          .mapValues((angle) => normaliseAngleValue(angle))
          .pickBy(
            (angle, modifier): angle is Value =>
              _.isString(modifier) && modifier !== '' && _.isString(angle)
          )
          .value()
      : {}

  private defaultFunctionValues: Required<
    Omit<NormaliseFunctionValuesOptions, 'dimension'>
  > = {
    rotateX: 'var(--tw-rotate-x)',
    rotateY: 'var(--tw-rotate-y)',
    skewX: 'var(--tw-skew-x)',
    skewY: 'var(--tw-skew-y)',
  }

  public normaliseFunctionValues = ({
    dimension,
    rotateX,
    rotateY,
    skewX,
    skewY,
  }: NormaliseFunctionValuesOptions = {}) => {
    const safeDimension = normaliseDimension(dimension)

    const safeValues = {
      rotateX: normaliseAngleValue(rotateX, this.defaultFunctionValues.rotateX),
      rotateY: normaliseAngleValue(rotateY, this.defaultFunctionValues.rotateY),
      skewX: normaliseAngleValue(skewX, this.defaultFunctionValues.skewX),
      skewY: normaliseAngleValue(skewY, this.defaultFunctionValues.skewY),
    }

    return [
      {
        '3d': `rotateX(${safeValues.rotateX}) rotateY(${safeValues.rotateY})`,
        '2d': '',
      },
      `skewX(${safeValues.skewX})`,
      `skewY(${safeValues.skewY})`,
    ]
      .map((value) => (_.isString(value) ? value : value[safeDimension]))
      .join(' ')
  }

  public utilities = ({ matchUtilities, theme }: LocalPluginAPI) => {
    const functionValues = this.normaliseFunctionValues()
    const rotateValues = this.normaliseValues(theme('rotate'))
    const skewValues = this.normaliseValues(theme('skew'))

    matchUtilities(
      {
        rotate: (value) => ({
          '@defaults transform': {},
          '--tw-rotate-z': value,
          rotate: 'var(--tw-rotate-z)',
        }),
        'rotate-x': (value) => ({
          '@defaults transform': {},
          '--tw-rotate-x': value,
          transform: functionValues,
        }),
        'rotate-y': (value) => ({
          '@defaults transform': {},
          '--tw-rotate-y': value,
          transform: functionValues,
        }),
        'rotate-z': (value) => ({
          '@defaults transform': {},
          '--tw-rotate-z': value,
          rotate: 'var(--tw-rotate-z)',
        }),
      },
      {
        values: rotateValues,
        supportsNegativeValues: true,
      }
    )

    matchUtilities(
      {
        'skew-x': (value) => ({
          '@defaults transform': {},
          '--tw-skew-x': value,
          transform: functionValues,
        }),
        'skew-y': (value) => ({
          '@defaults transform': {},
          '--tw-skew-y': value,
          transform: functionValues,
        }),
      },
      {
        values: skewValues,
        supportsNegativeValues: true,
      }
    )
  }
}

export const transform = new Transform()
