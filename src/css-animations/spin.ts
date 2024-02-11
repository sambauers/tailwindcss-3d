import {
  chain,
  every,
  isPlainObject,
  isString,
  isUndefined,
  keys,
  mapValues,
  values,
} from 'lodash'
import defaultTheme from 'tailwindcss/defaultTheme'
import { type PluginUtils } from 'tailwindcss/types/config'

import { type CSSAnimation } from '@/css-animations'
import { Base } from '@/css-animations/base'
import { Transform } from '@/css-utilities/transform'
import { normaliseNumberValue, normaliseTimeValue } from '@/utils/css-value'
import { generateGuard } from '@/utils/generate-guard'
import {
  axesModifier,
  nameModifier,
  signModifier,
} from '@/utils/lodash-transformers'

type ProcessableValue = string | undefined
type ProcessableValues = Record<string, ProcessableValue>
type Value = string
type Values = Record<string, Value>

export class Spin extends Base implements CSSAnimation {
  private isProcessableValue = generateGuard<ProcessableValue>(
    isString,
    isUndefined,
  )

  private isProcessableValues = generateGuard<ProcessableValues>([
    isPlainObject,
    (maybe) => every(keys(maybe), isString),
    (maybe) => every(values(maybe), this.isProcessableValue),
  ])

  private normaliseValues = (values: unknown): Values =>
    this.isProcessableValues(values)
      ? chain(values)
          .mapKeys((_duration, modifier) => normaliseNumberValue(modifier))
          .mapValues((duration) => normaliseTimeValue(duration))
          .pickBy(
            (duration, modifier): duration is Value =>
              isString(modifier) && modifier !== '' && isString(duration),
          )
          .value()
      : {}

  public defaultTheme = this.normaliseValues(
    mapValues(defaultTheme.spacing, (_spacing, modifier) => `${modifier}s`),
  )

  private xyKeyframes = () => {
    interface SpinXYKeyframe {
      axis: string
      sign: string
    }

    interface TransformDeclarations {
      '--webkit-transform': string
      transform?: string
    }

    const rotateDeclarations = (
      axis: string,
      value: string,
    ): TransformDeclarations => {
      const rotateProperty = `rotate${axis.toUpperCase()}`
      const transformValue = this.legacy
        ? Transform.normaliseLegacyFunctionValues({ [rotateProperty]: value })
        : Transform.normaliseFunctionValues({ [rotateProperty]: value })

      return {
        '--webkit-transform': transformValue,
        transform: transformValue,
      }
    }

    return chain({ '1': '' })
      .transform(axesModifier(['x', 'y']), {})
      .transform(nameModifier('spin'), {})
      .transform(signModifier(), {})
      .mapValues(({ axis, sign }: SpinXYKeyframe) => ({
        from: { ...rotateDeclarations(axis, '0deg') },
        to: { ...rotateDeclarations(axis, `${sign}360deg`) },
      }))
      .value()
  }

  private zKeyframes = () => {
    interface SpinZKeyframe {
      sign: string
    }

    interface RotateDeclarations {
      rotate: string
    }

    interface TransformDeclarations {
      '--webkit-transform': string
      transform?: string
    }

    const rotateDeclarations = (
      value: string,
    ): RotateDeclarations | TransformDeclarations => {
      if (!this.legacy) {
        return { rotate: value }
      }

      const transformValue = Transform.normaliseLegacyFunctionValues({
        rotateZ: value,
      })

      return {
        '--webkit-transform': transformValue,
        transform: transformValue,
      }
    }

    return chain({ '1': '' })
      .transform(axesModifier('z'), {})
      .transform(nameModifier('spin'), {})
      .transform(signModifier(), {})
      .mapValues(({ sign }: SpinZKeyframe) => ({
        from: { ...rotateDeclarations('0deg') },
        to: { ...rotateDeclarations(`${sign}360deg`) },
      }))
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
          `${sign}${name}-${axis} ${value} linear infinite`,
      )
      .value()
  }
}
