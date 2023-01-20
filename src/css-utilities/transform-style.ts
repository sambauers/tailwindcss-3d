import type { LocalPluginAPI } from '../common'

interface UtilitiesOptions {
  matchUtilities: LocalPluginAPI['matchUtilities']
  theme: LocalPluginAPI['theme']
}

class TransformStyle {
  public defaultTheme = {
    flat: 'flat',
    '3d': 'preserve-3d',
  }

  public utilities = ({ matchUtilities, theme }: UtilitiesOptions) => {
    matchUtilities(
      { 'transform-style': (value) => ({ 'transform-style': value }) },
      { values: theme('transformStyle') }
    )
  }
}

export const transformStyle = new TransformStyle()
