import type { PluginAPI } from 'tailwindcss/types/config'

export interface LocalPluginAPI extends PluginAPI {
  addDefaults: (
    group: string,
    declarations: Record<string, string | string[]>
  ) => void
}
