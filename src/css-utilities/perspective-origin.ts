import type { CSSUtility } from '@/css-utilities'
import { Base } from '@/css-utilities/base'
import defaultTheme from 'tailwindcss/defaultTheme'

export class PerspectiveOrigin extends Base implements CSSUtility {
  static defaultTheme = defaultTheme.transformOrigin

  public utilities = () => {
    this.api.matchUtilities(
      { 'perspective-origin': (value) => ({ 'perspective-origin': value }) },
      { values: this.api.theme('perspectiveOrigin') }
    )
  }
}
