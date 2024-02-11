import {
  chain,
  every,
  isArray,
  isPlainObject,
  isString,
  isUndefined,
  keys,
  values,
} from 'lodash'
import defaultTheme from 'tailwindcss/defaultTheme'
import { type PluginUtils } from 'tailwindcss/types/config'

import { type CSSAnimation } from '@/css-animations'
import { Base } from '@/css-animations/base'
import { Transform } from '@/css-utilities/transform'
import { Translate } from '@/css-utilities/translate'
import {
  normaliseLengthPercentageValue,
  normaliseNumberValue,
  normaliseTimeValue,
} from '@/utils/css-value'
import { generateGuard } from '@/utils/generate-guard'
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

export class Bounce extends Base implements CSSAnimation {
  private isProcessablePrimitive = generateGuard<ProcessablePrimitive>(
    isString,
    isUndefined,
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

  private normaliseValues = (values: unknown): Values =>
    this.isProcessableValues(values)
      ? chain(values)
          .mapKeys((_value, modifier) => normaliseNumberValue(modifier))
          .mapValues(
            ([duration, distance]): ProcessableValue => [
              normaliseTimeValue(duration),
              normaliseLengthPercentageValue(distance),
            ],
          )
          .pickBy((value, modifier): value is Value => {
            const [duration, distance] = value
            return (
              isString(modifier) &&
              modifier !== '' &&
              modifier !== 'px' &&
              isString(duration) &&
              isString(distance)
            )
          })
          .value()
      : {}

  public defaultTheme = this.normaliseValues(
    chain(defaultTheme.spacing)
      .transform(addDurationWithGravity(), {})
      .mapValues(({ value: distance, duration }: { [k: string]: string }) => [
        duration,
        distance,
      ])
      .value(),
  )

  public keyframes = ({ theme }: PluginUtils) => {
    const values = this.normaliseValues(theme('bounce'))

    interface Keyframe {
      value: Value
      axis: string
      sign: string
    }

    interface TranslateDeclarations {
      translate: string
    }

    interface TransformDeclarations {
      '--webkit-transform': string
      transform?: string
    }

    const translateDeclarations = (
      axis: string,
      value: string,
    ): TranslateDeclarations | TransformDeclarations => {
      const translateProperty = `translate${axis.toUpperCase()}`

      if (!this.legacy) {
        return {
          translate: Translate.normaliseFunctionValues({
            [translateProperty]: value,
          }),
        }
      }

      const transformValue = Transform.normaliseLegacyFunctionValues({
        [translateProperty]: value,
      })

      return {
        '--webkit-transform': transformValue,
        transform: transformValue,
      }
    }

    return chain(values)
      .transform(axesModifier(), {})
      .transform(nameModifier('bounce'), {})
      .transform(signModifier(), {})
      .mapValues(({ value: [_duration, distance], axis, sign }: Keyframe) => ({
        '0%, 100%': {
          ...translateDeclarations(axis, `${sign}${distance}`),
          animationTimingFunction: 'cubic-bezier(0.5, 0, 1, 1)',
        },
        '50%': {
          ...translateDeclarations(axis, '0'),
          animationTimingFunction: 'cubic-bezier(0, 0, 0.5, 1)',
        },
      }))
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
          `${modifier} ${duration} infinite`,
      )
      .value()
  }
}
