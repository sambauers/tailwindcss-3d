import type { CSSAnimation } from '@/css-animations'
import type { PluginUtils } from 'tailwindcss/types/config'
import isString from 'lodash/isString'
import isUndefined from 'lodash/isUndefined'
import isPlainObject from 'lodash/isPlainObject'
import every from 'lodash/every'
import keys from 'lodash/keys'
import values from 'lodash/values'
import mapValues from 'lodash/mapValues'
import { chain } from 'lodash'
import { generateGuard } from '@/utils/generate-guard'
import { normaliseNumberValue, normaliseTimeValue } from '@/utils/css-value'
import defaultTheme from 'tailwindcss/defaultTheme'
import { transform } from '@/css-utilities/transform'
import {
  axesModifier,
  nameModifier,
  signModifier,
} from '@/utils/lodash-transformers'

type ProcessableValue = string | undefined
type ProcessableValues = Record<string, ProcessableValue>
type Value = string
type Values = Record<string, Value>

class Spin implements CSSAnimation {
  private isProcessableValue = generateGuard<ProcessableValue>(
    isString,
    isUndefined
  )

  private isProcessableValues = generateGuard<ProcessableValues>([
    isPlainObject,
    (maybe) => every(keys(maybe), isString),
    (maybe) => every(values(maybe), this.isProcessableValue),
  ])

  private isValues = generateGuard<Values>([
    isPlainObject,
    (maybe) => every(keys(maybe), isString),
    (maybe) => every(values(maybe), isString),
  ])

  private normaliseValues = (values: unknown): Values =>
    this.isProcessableValues(values)
      ? chain(values)
          .mapKeys(
            (_duration, modifier) => normaliseNumberValue(modifier) ?? ''
          )
          .mapValues((duration) => normaliseTimeValue(duration))
          .pickBy(
            (duration, modifier): duration is Value =>
              isString(modifier) && modifier !== '' && isString(duration)
          )
          .value()
      : {}

  public defaultTheme = this.normaliseValues(
    mapValues(defaultTheme.spacing, (_spacing, modifier) => `${modifier}s`)
  )

  private xyKeyframes = () => {
    interface SpinXYKeyframe {
      axis: string
      sign: string
    }

    return chain({ '1': '' })
      .transform(axesModifier(['x', 'y']), {})
      .transform(nameModifier('spin'), {})
      .transform(signModifier(), {})
      .mapValues(({ axis, sign }: SpinXYKeyframe) => {
        const rotateProperty = `rotate${axis.toUpperCase()}`

        return {
          from: {
            transform: transform.normaliseFunctionValues({
              [rotateProperty]: '0deg',
            }),
          },
          to: {
            transform: transform.normaliseFunctionValues({
              [rotateProperty]: `${sign}360deg`,
            }),
          },
        }
      })
      .value()
  }

  private zKeyframes = () => {
    interface SpinZKeyframe {
      sign: string
    }

    return chain({ '1': '' })
      .transform(axesModifier('z'), {})
      .transform(nameModifier('spin'), {})
      .transform(signModifier(), {})
      .mapValues(({ sign }: SpinZKeyframe) => {
        return {
          from: { rotate: '0deg' },
          to: { rotate: `${sign}360deg` },
        }
      })
      .value()
  }

  public keyframes = () => ({
    ...this.xyKeyframes(),
    ...this.zKeyframes(),
  })

  public animation = ({ theme }: PluginUtils) => {
    const values = this.normaliseValues(theme('spin'))

    interface SpinAnimation {
      value: string
      axis: string
      name: string
      sign: string
    }

    return chain(values)
      .transform(axesModifier(), {})
      .transform(nameModifier('spin'), {})
      .transform(signModifier(), {})
      .mapValues(
        ({ value, axis, name, sign }: SpinAnimation) =>
          `${sign}${name}-${axis} ${value} linear infinite`
      )
      .value()
  }
}

export const spin = new Spin()
