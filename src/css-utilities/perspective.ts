import type { CSSUtility } from '@/css-utilities'
import type { LocalPluginAPI } from '@/common'

class Perspective implements CSSUtility {
  public defaultTheme = {
    none: 'none',
    250: '250px',
    500: '500px',
    750: '750px',
    1000: '1000px',
  }

  public utilities = ({ matchUtilities, theme }: LocalPluginAPI) => {
    matchUtilities(
      {
        perspective: (value) => ({
          '@defaults transform': {},
          '--tw-perspective': value,
          perspective: 'var(--tw-perspective)',
        }),
      },
      {
        values: theme('perspective'),
        supportsNegativeValues: true,
      }
    )
  }
}

export const perspective = new Perspective()
