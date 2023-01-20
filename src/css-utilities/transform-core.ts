import type { LocalPluginAPI } from '../common'
import { translate } from './translate'
import { scale } from './scale'
import { transform } from './transform'

interface UtilitiesOptions {
  addUtilities: LocalPluginAPI['addUtilities']
}

class TransformCore {
  public utilities = ({ addUtilities }: UtilitiesOptions) => {
    addUtilities({
      '.transform': {
        transform: transform.normaliseFunctionValues({ dimension: '2d' }),
      },
      '.transform-cpu': {
        translate: translate.normaliseFunctionValues({ dimension: '2d' }),
        scale: scale.normaliseFunctionValues({ dimension: '2d' }),
        transform: transform.normaliseFunctionValues({ dimension: '2d' }),
      },
      '.transform-gpu': {
        translate: translate.normaliseFunctionValues(),
        scale: scale.normaliseFunctionValues(),
        transform: transform.normaliseFunctionValues(),
      },
      '.transform-none': { transform: 'none' },
    })
  }
}

export const transformCore = new TransformCore()
