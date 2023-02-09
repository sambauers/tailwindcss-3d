import type { CSSUtility } from '@/css-utilities'
import type { LocalPluginAPI } from '@/common'
import defaultTheme from 'tailwindcss/defaultTheme'

class PerspectiveOrigin implements CSSUtility {
  public defaultTheme = defaultTheme.transformOrigin

  public utilities = ({ matchUtilities, theme }: LocalPluginAPI) => {
    matchUtilities(
      { 'perspective-origin': (value) => ({ 'perspective-origin': value }) },
      { values: theme('perspectiveOrigin') }
    )
  }
}

export const perspectiveOrigin = new PerspectiveOrigin()
