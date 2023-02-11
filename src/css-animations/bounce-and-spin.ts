import type { CSSAnimation } from '@/css-animations'
import type { PluginUtils } from 'tailwindcss/types/config'
import { generateGuard } from '@/utils/generate-guard'
import _ from 'lodash'
import {
  normaliseLengthPercentageValue,
  normaliseNumberValue,
  normaliseTimeValue,
} from '@/utils/css-value'
import defaultTheme from 'tailwindcss/defaultTheme'
import { translate } from '@/css-utilities/translate'
import { transform } from '@/css-utilities/transform'
import {
  addDurationWithGravity,
  axesModifier,
  nameModifier,
  signModifier,
} from '@/utils/lodash-transformers'

type ProcessablePrimitive = string | undefined
type ProcessableValue = [ProcessablePrimitive, ProcessablePrimitive]
type ProcessableValues = Record<string, ProcessableValue>
type Value = [string, string]
type Values = Record<string, Value>

class BounceAndSpin implements CSSAnimation {
  private isProcessablePrimitive = generateGuard<ProcessablePrimitive>(
    _.isString,
    _.isUndefined
  )

  private isProcessableValue = generateGuard<ProcessableValue>([
    _.isArray,
    (maybe) => maybe.length === 2,
    (maybe) => _.every(_.values(maybe), this.isProcessablePrimitive),
  ])

  private isProcessableValues = generateGuard<ProcessableValues>([
    _.isPlainObject,
    (maybe) => _.every(_.keys(maybe), _.isString),
    (maybe) => _.every(_.values(maybe), this.isProcessableValue),
  ])

  private isValue = generateGuard<Value>([
    _.isArray,
    (maybe) => maybe.length === 2,
    (maybe) => _.every(_.values(maybe), _.isString),
  ])

  private isValues = generateGuard<Values>([
    _.isPlainObject,
    (maybe) => _.every(_.keys(maybe), _.isString),
    (maybe) => _.every(_.values(maybe), this.isValue),
  ])

  private normaliseValues = (values: unknown): Values => {
    return this.isProcessableValues(values)
      ? _.chain(values)
          .mapKeys((_value, modifier) => normaliseNumberValue(modifier) ?? '')
          .mapValues(
            ([duration, distance]): ProcessableValue => [
              normaliseTimeValue(duration),
              normaliseLengthPercentageValue(distance),
            ]
          )
          .pickBy((value, modifier): value is Value => {
            const [duration, distance] = value
            return (
              _.isString(modifier) &&
              modifier !== '' &&
              _.isString(duration) &&
              _.isString(distance)
            )
          })
          .value()
      : {}
  }

  public defaultTheme = this.normaliseValues(
    _.chain(defaultTheme.spacing)
      .transform(addDurationWithGravity(), {})
      .mapValues(({ value: distance, duration }: { [k: string]: string }) => [
        duration,
        distance,
      ])
      .value()
  )

  public keyframes = ({ theme }: PluginUtils) => {
    const values = this.normaliseValues(theme('bounceAndSpin'))

    interface Keyframe {
      value: Value
      axis: string
      sign: string
    }

    interface RotateProperty {
      rotate: string
    }

    interface TransformProperties {
      '-webkit-transform': string
      transform?: string
    }

    const rotateProperties = (
      axis: string,
      value: string
    ): RotateProperty | TransformProperties => {
      const rotateProperty = `rotate${axis.toUpperCase()}`

      if (axis === 'z') {
        return { rotate: value }
      }

      const transformProperty = transform.normaliseFunctionValues({
        [rotateProperty]: value,
      })

      return {
        '-webkit-transform': transformProperty,
        transform: transformProperty,
      }
    }

    return _.chain(values)
      .transform(axesModifier())
      .transform(nameModifier('bounce-and-spin'))
      .transform(signModifier())
      .mapValues(({ value: [_duration, distance], axis, sign }: Keyframe) => {
        const translateProperty = `translate${axis.toUpperCase()}`
        // const oppositeSign = axis === 'y' && sign === '' ? '-' : ''

        return {
          '0%, 100%': {
            translate: translate.normaliseFunctionValues({
              [translateProperty]: '0',
            }),
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
          '0%, 5%': {
            ...rotateProperties(axis, '0deg'),
            animationTimingFunction: 'ease-in',
          },
          '50%': {
            translate: translate.normaliseFunctionValues({
              [translateProperty]: `${sign}${distance}`,
            }),
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50.1%': {
            ...rotateProperties(axis, `${sign}180deg`),
            animationTimingFunction: 'linear',
          },
          '95%, 100%': {
            ...rotateProperties(axis, `${sign}360deg`),
            animationTimingFunction: 'ease-out',
          },
        }
      })
      .value()
  }

  public animation = ({ theme }: PluginUtils) => {
    const values = this.normaliseValues(theme('bounceAndSpin'))

    if (!this.isValues(values)) {
      return {}
    }

    interface Animation {
      value: Value
    }

    return _.chain(values)
      .transform(axesModifier())
      .transform(nameModifier('bounce-and-spin'))
      .transform(signModifier())
      .mapValues(
        ({ value: [duration] }: Animation, modifier) =>
          `${modifier} ${duration} infinite`
      )
      .value()
  }
}

export const bounceAndSpin = new BounceAndSpin()
