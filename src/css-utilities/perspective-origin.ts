import defaultTheme from 'tailwindcss/defaultTheme'
import type { LocalPluginAPI } from '../common'

interface UtilitiesOptions {
  matchUtilities: LocalPluginAPI['matchUtilities']
  theme: LocalPluginAPI['theme']
}

class PerspectiveOrigin {
  public defaultTheme = defaultTheme.transformOrigin

  public utilities = ({ matchUtilities, theme }: UtilitiesOptions) => {
    matchUtilities(
      { 'perspective-origin': (value) => ({ 'perspective-origin': value }) },
      { values: theme('perspectiveOrigin') }
    )
  }
}

export const perspectiveOrigin = new PerspectiveOrigin()
