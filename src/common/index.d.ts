import type { PluginAPI } from 'tailwindcss/types/config'

declare module '@/common' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type KeyValuePair<K extends keyof any = string, V = string> = Record<K, V>

  interface LocalPluginAPI extends PluginAPI {
    addDefaults: (
      group: string,
      declarations: Record<string, string | string[]>
    ) => void
  }
}
