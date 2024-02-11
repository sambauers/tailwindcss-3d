import { type CSSUtility } from '@/css-utilities'
import { Base } from '@/css-utilities/base'

export class TransformStyle extends Base implements CSSUtility {
  static defaultTheme = {
    flat: 'flat',
    '3d': 'preserve-3d',
  }

  public utilities = () => {
    this.api.matchUtilities(
      { 'transform-style': (value) => ({ 'transform-style': value }) },
      { values: this.api.theme('transformStyle') },
    )
  }
}
