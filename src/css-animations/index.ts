import { type PluginUtils, type ResolvableTo } from 'tailwindcss/types/config'

import { type KeyValuePair } from '@/common'

declare module '@/css-animations' {
  interface CSSAnimation {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    defaultTheme?: ResolvableTo<KeyValuePair<string, any>>
    keyframes: (pluginUtilities: PluginUtils) => void
    animation: (pluginUtilities: PluginUtils) => void
  }
}

export * from './bounce'
export * from './bounce-and-spin'
export * from './spin'
