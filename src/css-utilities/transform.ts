import { chain } from 'lodash'
import every from 'lodash/every'
import isPlainObject from 'lodash/isPlainObject'
import isString from 'lodash/isString'
import isUndefined from 'lodash/isUndefined'
import keys from 'lodash/keys'
import values from 'lodash/values'

import { type CSSUtility } from '@/css-utilities'
import { Base } from '@/css-utilities/base'
import {
  normaliseAngleValue,
  normaliseLengthPercentageValue,
  normaliseLengthValue,
  normaliseNumberPercentageValue,
  type UnsafeCSSValue,
} from '@/utils/css-value'
import { type Dimension } from '@/utils/dimension'
import { normaliseDimension } from '@/utils/dimension'
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

interface NormaliseLegacyFunctionValuesOptions
  extends NormaliseFunctionValuesOptions {
  translateX?: UnsafeCSSValue
  translateY?: UnsafeCSSValue
  translateZ?: UnsafeCSSValue
  rotateZ?: UnsafeCSSValue
  scaleX?: UnsafeCSSValue
  scaleY?: UnsafeCSSValue
  scaleZ?: UnsafeCSSValue
  perspective?: UnsafeCSSValue
}

export interface TransformDeclarations {
  '--webkit-transform': string
  transform: string
}

export class Transform extends Base implements CSSUtility {
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
          .mapValues((angle) => normaliseAngleValue(angle))
          .pickBy(
            (angle, modifier): angle is Value =>
              isString(modifier) && modifier !== '' && isString(angle)
          )
          .value()
      : {}

  static defaultFunctionValues: Required<
    Omit<NormaliseFunctionValuesOptions, 'dimension'>
  > = {
    rotateX: 'var(--tw-rotate-x)',
    rotateY: 'var(--tw-rotate-y)',
    skewX: 'var(--tw-skew-x)',
    skewY: 'var(--tw-skew-y)',
  }

  static defaultLegacyFunctionValues: Required<
    Omit<NormaliseLegacyFunctionValuesOptions, 'dimension'>
  > = {
    ...Transform.defaultFunctionValues,
    translateX: 'var(--tw-translate-x)',
    translateY: 'var(--tw-translate-y)',
    translateZ: 'var(--tw-translate-z)',
    rotateZ: 'var(--tw-rotate-z)',
    scaleX: 'var(--tw-scale-x)',
    scaleY: 'var(--tw-scale-y)',
    scaleZ: 'var(--tw-scale-z)',
    perspective: 'var(--tw-perspective)',
  }

  static normaliseFunctionValues = ({
    dimension,
    rotateX,
    rotateY,
    skewX,
    skewY,
  }: NormaliseFunctionValuesOptions = {}) => {
    const safeDimension = normaliseDimension(dimension)

    const safeValues = {
      rotateX: normaliseAngleValue(
        rotateX,
        Transform.defaultFunctionValues.rotateX
      ),
      rotateY: normaliseAngleValue(
        rotateY,
        Transform.defaultFunctionValues.rotateY
      ),
      skewX: normaliseAngleValue(skewX, Transform.defaultFunctionValues.skewX),
      skewY: normaliseAngleValue(skewY, Transform.defaultFunctionValues.skewY),
    }

    return [
      {
        '3d': `rotateX(${safeValues.rotateX}) rotateY(${safeValues.rotateY})`,
        '2d': '',
      },
      `skewX(${safeValues.skewX})`,
      `skewY(${safeValues.skewY})`,
    ]
      .map((value) => (isString(value) ? value : value[safeDimension]))
      .filter((value) => value !== '')
      .join(' ')
  }

  static normaliseLegacyFunctionValues = ({
    dimension,
    translateX,
    translateY,
    translateZ,
    rotateX,
    rotateY,
    rotateZ,
    skewX,
    skewY,
    scaleX,
    scaleY,
    scaleZ,
    perspective,
  }: NormaliseLegacyFunctionValuesOptions = {}) => {
    const safeDimension = normaliseDimension(dimension)

    const safeValues = {
      translateX: normaliseLengthPercentageValue(
        translateX,
        Transform.defaultLegacyFunctionValues.translateX
      ),
      translateY: normaliseLengthPercentageValue(
        translateY,
        Transform.defaultLegacyFunctionValues.translateY
      ),
      translateZ: normaliseLengthPercentageValue(
        translateZ,
        Transform.defaultLegacyFunctionValues.translateZ
      ),
      rotateX: normaliseAngleValue(
        rotateX,
        Transform.defaultLegacyFunctionValues.rotateX
      ),
      rotateY: normaliseAngleValue(
        rotateY,
        Transform.defaultLegacyFunctionValues.rotateY
      ),
      rotateZ: normaliseAngleValue(
        rotateZ,
        Transform.defaultLegacyFunctionValues.rotateZ
      ),
      skewX: normaliseAngleValue(
        skewX,
        Transform.defaultLegacyFunctionValues.skewX
      ),
      skewY: normaliseAngleValue(
        skewY,
        Transform.defaultLegacyFunctionValues.skewY
      ),
      scaleX: normaliseNumberPercentageValue(
        scaleX,
        Transform.defaultLegacyFunctionValues.scaleX,
        { lowerLimit: 0 }
      ),
      scaleY: normaliseNumberPercentageValue(
        scaleY,
        Transform.defaultLegacyFunctionValues.scaleY,
        { lowerLimit: 0 }
      ),
      scaleZ: normaliseNumberPercentageValue(
        scaleZ,
        Transform.defaultLegacyFunctionValues.scaleZ,
        { lowerLimit: 0 }
      ),
      perspective: normaliseLengthValue(
        perspective,
        Transform.defaultLegacyFunctionValues.perspective
      ),
    }

    return [
      {
        '3d': `translate3d(${safeValues.translateX}, ${safeValues.translateY}, ${safeValues.translateZ})`,
        '2d': `translate(${safeValues.translateX}, ${safeValues.translateY})`,
      },
      {
        '3d': `rotateX(${safeValues.rotateX}) rotateY(${safeValues.rotateY}) rotateZ(${safeValues.rotateZ})`,
        '2d': `rotate(${safeValues.rotateZ})`,
      },
      `skewX(${safeValues.skewX})`,
      `skewY(${safeValues.skewY})`,
      `scaleX(${safeValues.scaleX})`,
      `scaleY(${safeValues.scaleY})`,
      {
        '3d': `scaleZ(${safeValues.scaleZ})`,
        '2d': '',
      },
      {
        '3d': `perspective(${safeValues.perspective})`,
        '2d': '',
      },
    ]
      .map((value) => (isString(value) ? value : value[safeDimension]))
      .filter((value) => value !== '')
      .join(' ')
  }

  static declarations = (
    values: NormaliseFunctionValuesOptions = {}
  ): TransformDeclarations => {
    const functionValues = Transform.normaliseFunctionValues(values)
    return {
      '--webkit-transform': functionValues,
      transform: functionValues,
    }
  }

  static legacyDeclarations = (
    values: NormaliseLegacyFunctionValuesOptions = {}
  ): TransformDeclarations => {
    const functionValues = Transform.normaliseLegacyFunctionValues(values)
    return {
      '--webkit-transform': functionValues,
      transform: functionValues,
    }
  }

  public utilities = () => {
    const rotateValues = this.normaliseValues(this.api.theme('rotate'))
    const skewValues = this.normaliseValues(this.api.theme('skew'))
    const transformDeclarations = this.legacy
      ? Transform.legacyDeclarations()
      : Transform.declarations()

    this.api.matchUtilities(
      {
        rotate: (value) => ({
          '@defaults transform': {},
          '--tw-rotate-z': value,
          ...(this.legacy
            ? transformDeclarations
            : { rotate: 'var(--tw-rotate-z)' }),
        }),
        'rotate-x': (value) => ({
          '@defaults transform': {},
          '--tw-rotate-x': value,
          ...transformDeclarations,
        }),
        'rotate-y': (value) => ({
          '@defaults transform': {},
          '--tw-rotate-y': value,
          ...transformDeclarations,
        }),
        'rotate-z': (value) => ({
          '@defaults transform': {},
          '--tw-rotate-z': value,
          ...(this.legacy
            ? transformDeclarations
            : { rotate: 'var(--tw-rotate-z)' }),
        }),
      },
      {
        values: rotateValues,
        supportsNegativeValues: true,
      }
    )

    this.api.matchUtilities(
      {
        'skew-x': (value) => ({
          '@defaults transform': {},
          '--tw-skew-x': value,
          ...transformDeclarations,
        }),
        'skew-y': (value) => ({
          '@defaults transform': {},
          '--tw-skew-y': value,
          ...transformDeclarations,
        }),
      },
      {
        values: skewValues,
        supportsNegativeValues: true,
      }
    )
  }
}
