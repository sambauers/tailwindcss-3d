import type { CSSUtility } from '@/css-utilities'
import type { LocalPluginAPI } from '@/common'

class TransformStyle implements CSSUtility {
  public defaultTheme = {
    flat: 'flat',
    '3d': 'preserve-3d',
  }

  public utilities = ({ matchUtilities, theme }: LocalPluginAPI) => {
    matchUtilities(
      { 'transform-style': (value) => ({ 'transform-style': value }) },
      { values: theme('transformStyle') }
    )
  }
}

export const transformStyle = new TransformStyle()
