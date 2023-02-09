import type { CSSAnimation } from '@/css-animations'
import type { PluginUtils } from 'tailwindcss/types/config'
import _ from 'lodash'
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
          .mapKeys(
            (_duration, modifier) => normaliseNumberValue(modifier) ?? ''
          )
          .mapValues((duration) => normaliseTimeValue(duration))
          .pickBy(
            (duration, modifier): duration is Value =>
              _.isString(modifier) && modifier !== '' && _.isString(duration)
          )
          .value()
      : {}

  public defaultTheme = this.normaliseValues(
    _.mapValues(defaultTheme.spacing, (_spacing, modifier) => `${modifier}s`)
  )

  private xyKeyframes = () => {
    interface SpinXYKeyframe {
      axis: string
      sign: string
    }

    return _.chain({ '1': '' })
      .transform(axesModifier(['x', 'y']), {})
      .transform(nameModifier('spin'), {})
      .transform(signModifier(), {})
      .mapValues(({ axis, sign }: SpinXYKeyframe) => {
        const parameter = `rotate${axis.toUpperCase()}`

        return {
          from: {
            transform: transform.normaliseFunctionValues({
              [parameter]: '0deg',
            }),
          },
          to: {
            transform: transform.normaliseFunctionValues({
              [parameter]: `${sign}360deg`,
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

    return _.chain({ '1': '' })
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

    return _.chain(values)
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
