import { ensureBoolean } from '@/utils/ensure'

export abstract class Base {
  protected legacy = false

  constructor(legacy: boolean) {
    this.legacy = ensureBoolean(legacy, false)
  }
}
