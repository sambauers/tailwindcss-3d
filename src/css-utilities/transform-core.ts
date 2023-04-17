import type { CSSUtility } from '@/css-utilities'
import { Base } from '@/css-utilities/base'
import { Translate } from '@/css-utilities/translate'
import { Scale } from '@/css-utilities/scale'
import { Transform } from '@/css-utilities/transform'

export class TransformCore extends Base implements CSSUtility {
  public utilities = () => {
    const transformValue2d = this.legacy
      ? Transform.normaliseLegacyFunctionValues({ dimension: '2d' })
      : Transform.normaliseFunctionValues({ dimension: '2d' })

    const transformValue3d = this.legacy
      ? Transform.normaliseLegacyFunctionValues()
      : Transform.normaliseFunctionValues()

    const transformDeclarations2d = {
      '--webkit-transform': transformValue2d,
      transform: transformValue2d,
    }

    const transformDeclarations3d = {
      '--webkit-transform': transformValue3d,
      transform: transformValue3d,
    }

    this.api.addUtilities({
      // Leaving `.transform` utility here for backward compatibility,
      // not really sure what purpose it serves though
      '.transform': transformDeclarations2d,
      '.transform-cpu': this.legacy
        ? transformDeclarations2d
        : {
            translate: Translate.normaliseFunctionValues({ dimension: '2d' }),
            scale: Scale.normaliseFunctionValues({ dimension: '2d' }),
            ...transformDeclarations2d,
          },
      '.transform-gpu': this.legacy
        ? transformDeclarations3d
        : {
            translate: Translate.normaliseFunctionValues(),
            scale: Scale.normaliseFunctionValues(),
            ...transformDeclarations3d,
          },
      '.transform-none': this.legacy
        ? {
            '--webkit-transform': 'none',
            transform: 'none',
          }
        : {
            translate: 'none',
            scale: 'none',
            '--webkit-transform': 'none',
            transform: 'none',
          },
    })
  }
}
