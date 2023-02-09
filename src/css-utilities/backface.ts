import type { CSSUtility } from '@/css-utilities'
import type { LocalPluginAPI } from '@/common'

class Backface implements CSSUtility {
  public defaultTheme = { visible: 'visible', hidden: 'hidden' }

  public utilities = ({ matchUtilities, theme }: LocalPluginAPI) => {
    matchUtilities(
      { backface: (value) => ({ 'backface-visibility': value }) },
      { values: theme('backface') }
    )
  }
}

export const backface = new Backface()
