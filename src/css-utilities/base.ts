import { type LocalPluginAPI } from '@/common'
import { ensureBoolean } from '@/utils/ensure'

export abstract class Base {
  protected legacy = false

  constructor(
    protected api: LocalPluginAPI,
    legacy = false,
  ) {
    this.legacy = ensureBoolean(legacy, false)
  }
}
