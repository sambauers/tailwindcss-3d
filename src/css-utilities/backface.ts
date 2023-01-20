import type { LocalPluginAPI } from '../common'

interface UtilitiesOptions {
  matchUtilities: LocalPluginAPI['matchUtilities']
  theme: LocalPluginAPI['theme']
}

class Backface {
  public defaultTheme = { visible: 'visible', hidden: 'hidden' }

  public utilities = ({ matchUtilities, theme }: UtilitiesOptions) => {
    matchUtilities(
      { backface: (value) => ({ 'backface-visibility': value }) },
      { values: theme('backface') }
    )
  }
}

export const backface = new Backface()
