import type { LocalPluginAPI } from '../common'

interface UtilitiesOptions {
  matchUtilities: LocalPluginAPI['matchUtilities']
  theme: LocalPluginAPI['theme']
}

class Perspective {
  public defaultTheme = {
    none: 'none',
    250: '250px',
    500: '500px',
    750: '750px',
    1000: '1000px',
  }

  public utilities = ({ matchUtilities, theme }: UtilitiesOptions) => {
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
