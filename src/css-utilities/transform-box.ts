import type { CSSUtility } from '@/css-utilities'
import type { LocalPluginAPI } from '@/common'

class TransformBox implements CSSUtility {
  public defaultTheme = {
    content: 'content-box',
    border: 'border-box',
    fill: 'fill-box',
    stroke: 'stroke-box',
    view: 'view-box',
  }

  public utilities = ({ matchUtilities, theme }: LocalPluginAPI) => {
    matchUtilities(
      { 'transform-box': (value) => ({ 'transform-box': value }) },
      { values: theme('transformBox') }
    )
  }
}

export const transformBox = new TransformBox()
