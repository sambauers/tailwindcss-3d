import { LocalPluginAPI } from '../../common'

// Note: not mocking a module, just a helper for understanding plugin api calls

export class MatchUtilitiesMock {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public utilityCallValues: any[] = []

  public implementation: LocalPluginAPI['matchUtilities'] = (
    utilities,
    options
  ) => {
    const values = options?.values || {}

    for (const key in utilities) {
      if (Reflect.has(utilities, key)) {
        const utility = utilities[key]
        if (typeof utility !== 'function') {
          continue
        }

        for (const modifier in values) {
          if (Reflect.has(values, modifier)) {
            const value = values[modifier]
            this.utilityCallValues.push(value) // Push the value to storage
            utility(value, { modifier }) // Actually execute the function
          }
        }
      }
    }
  }
}
