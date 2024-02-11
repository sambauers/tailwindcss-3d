import plugin from 'tailwindcss/plugin'

import { type LocalPluginAPI } from '@/common'
import { Bounce, BounceAndSpin, Spin } from '@/css-animations'
import {
  Backface,
  Perspective,
  PerspectiveOrigin,
  Scale,
  Transform,
  TransformBox,
  TransformCore,
  TransformStyle,
  Translate,
} from '@/css-utilities'
import { ensureBoolean } from '@/utils/ensure'

// Default CSS variables, modelled from core
const DEFAULT_VARIABLE_VALUES: Record<string, string> = {
  '--tw-perspective': 'none',
  '--tw-translate-x': '0',
  '--tw-translate-y': '0',
  '--tw-translate-z': '0',
  '--tw-rotate-x': '0',
  '--tw-rotate-y': '0',
  '--tw-rotate-z': '0', // Not backward compatible with rotate core plugin
  '--tw-skew-x': '0',
  '--tw-skew-y': '0',
  '--tw-scale-x': '1',
  '--tw-scale-y': '1',
  '--tw-scale-z': '1',
}

interface PluginOptions {
  legacy?: boolean
}

const optionDefaults: Required<PluginOptions> = {
  legacy: false,
}

const tailwindCss3d = plugin.withOptions(
  ({ legacy = optionDefaults.legacy }: PluginOptions = optionDefaults) => {
    const safeLegacy = ensureBoolean(legacy, optionDefaults.legacy)

    return (api) => {
      const localAPI = api as LocalPluginAPI

      // Replace the transform core plugin defaults and add some new ones
      localAPI.addDefaults('transform', DEFAULT_VARIABLE_VALUES)

      const perspective = new Perspective(localAPI, safeLegacy)
      const transformStyle = new TransformStyle(localAPI)
      const translate = new Translate(localAPI, safeLegacy)
      const transform = new Transform(localAPI, safeLegacy)
      const scale = new Scale(localAPI, safeLegacy)
      const backface = new Backface(localAPI)
      const perspectiveOrigin = new PerspectiveOrigin(localAPI)
      const transformBox = new TransformBox(localAPI)
      const transformCore = new TransformCore(localAPI, safeLegacy)

      // New CSS Utilities
      perspective.utilities()
      transformStyle.utilities()
      translate.utilities()
      transform.utilities()
      scale.utilities()
      backface.utilities()
      perspectiveOrigin.utilities()
      transformBox.utilities()
      transformCore.utilities()
    }
  },
  ({ legacy = optionDefaults.legacy }: PluginOptions = optionDefaults) => {
    const safeLegacy = ensureBoolean(legacy, optionDefaults.legacy)

    const spin = new Spin(safeLegacy)
    const bounce = new Bounce(safeLegacy)
    const bounceAndSpin = new BounceAndSpin(safeLegacy)

    return {
      theme: {
        // Set new theme defaults
        perspective: Perspective.defaultTheme,
        transformStyle: TransformStyle.defaultTheme,
        backface: Backface.defaultTheme,
        perspectiveOrigin: PerspectiveOrigin.defaultTheme,
        transformBox: TransformBox.defaultTheme,
        spin: spin.defaultTheme,
        bounce: bounce.defaultTheme,
        bounceAndSpin: bounceAndSpin.defaultTheme,

        extend: {
          // Update the core transform transition property
          transitionProperty: {
            transform: safeLegacy
              ? 'transform'
              : 'perspective, translate, scale, transform, perspective, rotate',
          },

          // New CSS keyframes and animations
          keyframes: (pluginUtilities) => ({
            ...spin.keyframes(),
            ...bounce.keyframes(pluginUtilities),
            ...bounceAndSpin.keyframes(pluginUtilities),
          }),
          animation: (pluginUtilities) => ({
            ...spin.animation(pluginUtilities),
            ...bounce.animation(pluginUtilities),
            ...bounceAndSpin.animation(pluginUtilities),
          }),
        },
      },

      // Disable some core plugins which are superceded by this plugin
      corePlugins: {
        rotate: false,
        scale: false,
        skew: false,
        transform: false,
        translate: false,
      },
    }
  },
)

export = tailwindCss3d
