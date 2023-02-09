import type { CSSUtility } from '@/css-utilities'
import type { LocalPluginAPI } from '@/common'
import { translate } from '@/css-utilities/translate'
import { scale } from '@/css-utilities/scale'
import { transform } from '@/css-utilities/transform'

class TransformCore implements CSSUtility {
  public utilities = ({ addUtilities }: LocalPluginAPI) => {
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
