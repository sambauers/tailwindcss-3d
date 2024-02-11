import { type CSSUtility } from '@/css-utilities'
import { Base } from '@/css-utilities/base'

export class TransformBox extends Base implements CSSUtility {
  static defaultTheme = {
    content: 'content-box',
    border: 'border-box',
    fill: 'fill-box',
    stroke: 'stroke-box',
    view: 'view-box',
  }

  public utilities = () => {
    this.api.matchUtilities(
      { 'transform-box': (value) => ({ 'transform-box': value }) },
      { values: this.api.theme('transformBox') },
    )
  }
}
