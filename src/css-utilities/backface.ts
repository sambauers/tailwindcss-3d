import type { CSSUtility } from '@/css-utilities'
import { Base } from '@/css-utilities/base'

export class Backface extends Base implements CSSUtility {
  static defaultTheme = { visible: 'visible', hidden: 'hidden' }

  public utilities = () => {
    this.api.matchUtilities(
      { backface: (value) => ({ 'backface-visibility': value }) },
      { values: this.api.theme('backface') }
    )
  }
}
