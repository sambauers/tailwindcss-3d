import plugin from 'tailwindcss/plugin'
import type { LocalPluginAPI } from '@/common'

// css-utilities
import { perspective } from './css-utilities/perspective'
import { transformStyle } from './css-utilities/transform-style'
import { translate } from './css-utilities/translate'
import { transform } from './css-utilities/transform'
import { scale } from './css-utilities/scale'
import { backface } from './css-utilities/backface'
import { perspectiveOrigin } from './css-utilities/perspective-origin'
import { transformBox } from './css-utilities/transform-box'
import { transformCore } from './css-utilities/transform-core'

// css-animations
import { spin } from './css-animations/spin'
import { bounce } from './css-animations/bounce'
import { bounceAndSpin } from './css-animations/bounce-and-spin'

// Default CSS variables, modelled from core
const DEFAULT_VARIABLE_VALUES: Record<string, string> = {
  '--tw-perspective:': 'none',
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

const tailwind3d = plugin(
  (api) => {
    const localAPI = api as LocalPluginAPI

    // Replace the transform core plugin defaults and add some new ones
    localAPI.addDefaults('transform', DEFAULT_VARIABLE_VALUES)

    // New CSS Utilities
    perspective.utilities(localAPI)
    transformStyle.utilities(localAPI)
    translate.utilities(localAPI)
    transform.utilities(localAPI)
    scale.utilities(localAPI)
    backface.utilities(localAPI)
    perspectiveOrigin.utilities(localAPI)
    transformBox.utilities(localAPI)
    transformCore.utilities(localAPI)
  },
  {
    theme: {
      // Set new theme defaults
      perspective: perspective.defaultTheme,
      transformStyle: transformStyle.defaultTheme,
      backface: backface.defaultTheme,
      perspectiveOrigin: perspectiveOrigin.defaultTheme,
      transformBox: transformBox.defaultTheme,
      spin: spin.defaultTheme,
      bounce: bounce.defaultTheme,
      bounceAndSpin: bounceAndSpin.defaultTheme,

      extend: {
        // Update the core transform transition property
        transitionProperty: {
          transform:
            'perspective, translate, scale, transform, perspective, rotate',
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
)

export = tailwind3d
