import { LocalPluginAPI } from '../common'

interface UtilitiesOptions {
  matchUtilities: LocalPluginAPI['matchUtilities']
  theme: LocalPluginAPI['theme']
}

class TransformBox {
  public defaultTheme = {
    content: 'content-box',
    border: 'border-box',
    fill: 'fill-box',
    stroke: 'stroke-box',
    view: 'view-box',
  }

  public utilities = ({ matchUtilities, theme }: UtilitiesOptions) => {
    matchUtilities(
      { 'transform-box': (value) => ({ 'transform-box': value }) },
      { values: theme('transformBox') }
    )
  }
}

export const transformBox = new TransformBox()
