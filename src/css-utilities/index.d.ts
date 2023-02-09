import type { ResolvableTo } from 'tailwindcss/types/config'
import type { KeyValuePair, LocalPluginAPI } from '@/common'

declare module '@/css-utilities' {
  interface CSSUtility {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    defaultTheme?: ResolvableTo<KeyValuePair<string, any>>
    utilities: (options: LocalPluginAPI) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    normaliseFunctionValues?: (values: Record<string, any>) => string
  }
}
