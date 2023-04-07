import type { CSSAnimation } from '@/css-animations'
import type { PluginUtils } from 'tailwindcss/types/config'
import isString from 'lodash/isString'
import isUndefined from 'lodash/isUndefined'
import isArray from 'lodash/isArray'
import isPlainObject from 'lodash/isPlainObject'
import every from 'lodash/every'
import keys from 'lodash/keys'
import values from 'lodash/values'
import { chain } from 'lodash'
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
    isString,
    isUndefined
  )

  private isProcessableValue = generateGuard<ProcessableValue>([
    isArray,
    (maybe) => maybe.length === 2,
    (maybe) => every(values(maybe), this.isProcessablePrimitive),
  ])

  private isProcessableValues = generateGuard<ProcessableValues>([
    isPlainObject,
    (maybe) => every(keys(maybe), isString),
    (maybe) => every(values(maybe), this.isProcessableValue),
  ])

  private isValue = generateGuard<Value>([
    isArray,
    (maybe) => maybe.length === 2,
    (maybe) => every(values(maybe), isString),
  ])

  private isValues = generateGuard<Values>([
    isPlainObject,
    (maybe) => every(keys(maybe), isString),
    (maybe) => every(values(maybe), this.isValue),
  ])

  private normaliseValues = (values: unknown): Values => {
    return this.isProcessableValues(values)
      ? chain(values)
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
              isString(modifier) &&
              modifier !== '' &&
              isString(duration) &&
              isString(distance)
            )
          })
          .value()
      : {}
  }

  public defaultTheme = this.normaliseValues(
    chain(defaultTheme.spacing)
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

    return chain(values)
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

    return chain(values)
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
