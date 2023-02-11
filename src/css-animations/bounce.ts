import type { CSSAnimation } from '@/css-animations'
import type { PluginUtils } from 'tailwindcss/types/config'
import _ from 'lodash'
import { generateGuard } from '@/utils/generate-guard'
import {
  normaliseLengthPercentageValue,
  normaliseNumberValue,
  normaliseTimeValue,
} from '@/utils/css-value'
import defaultTheme from 'tailwindcss/defaultTheme'
import {
  addDurationWithGravity,
  axesModifier,
  nameModifier,
  signModifier,
} from '@/utils/lodash-transformers'
import { translate } from '@/css-utilities/translate'

type ProcessablePrimitive = string | undefined
type ProcessableValue = [ProcessablePrimitive, ProcessablePrimitive]
type ProcessableValues = Record<string, ProcessableValue>
type Value = [string, string]
type Values = Record<string, Value>

class Bounce implements CSSAnimation {
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
    const values = this.normaliseValues(theme('bounce'))

    if (!this.isValues(values)) {
      return {}
    }

    interface Keyframe {
      value: Value
      axis: string
      sign: string
    }

    return _.chain(values)
      .transform(axesModifier(), {})
      .transform(nameModifier('bounce'), {})
      .transform(signModifier(), {})
      .mapValues(({ value: [_duration, distance], axis, sign }: Keyframe) => {
        const translateProperty = `translate${axis.toUpperCase()}`

        return {
          '0%, 100%': {
            translate: translate.normaliseFunctionValues({
              [translateProperty]: `${sign}${distance}`,
            }),
            animationTimingFunction: 'cubic-bezier(0.5, 0, 1, 1)',
          },
          '50%': {
            translate: translate.normaliseFunctionValues({
              [translateProperty]: '0',
            }),
            animationTimingFunction: 'cubic-bezier(0, 0, 0.5, 1)',
          },
        }
      })
      .value()
  }

  public animation = ({ theme }: PluginUtils) => {
    const values = this.normaliseValues(theme('bounce'))

    interface Animation {
      value: Value
    }

    return _.chain(values)
      .transform(axesModifier(), {})
      .transform(nameModifier('bounce'), {})
      .transform(signModifier(), {})
      .mapValues(
        ({ value: [duration] }: Animation, modifier) =>
          `${modifier} ${duration} infinite`
      )
      .value()
  }
}

export const bounce = new Bounce()
