import _ from 'lodash'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RecordAny = Record<string, any>

export const axesModifier = <T extends RecordAny>(
  axes?: string | string[],
  silentModifier?: string
) => {
  const safeAxes = _.isUndefined(axes) ? ['x', 'y', 'z'] : _.flatten([axes])
  const safeSilentModifier = _.isUndefined(silentModifier)
    ? '1'
    : silentModifier

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (result: T, value: any, modifier: string) => {
    _.forEach(safeAxes, (axis) => {
      const property =
        String(modifier) === String(safeSilentModifier)
          ? axis
          : `${axis}-${modifier}`

      result[property as keyof T] = _.isPlainObject(value)
        ? { axis, originalModifier: modifier, ...value }
        : { axis, originalModifier: modifier, value: value }
    })
  }
}

export const nameModifier = <T extends RecordAny>(
  name?: string,
  silentModifier?: string
) => {
  const safeName = _.isString(name) ? name : ''
  const safeSilentModifier = _.isString(silentModifier)
    ? silentModifier
    : safeName === '' // If there is no name, don't silence the modifier
    ? ''
    : '1'

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (result: T, value: any, modifier: string) => {
    const property =
      String(modifier) === safeSilentModifier
        ? safeName
        : safeName === ''
        ? modifier
        : `${safeName}-${modifier}`

    result[property as keyof T] = _.isPlainObject(value)
      ? { name, originalModifier: modifier, ...value }
      : { name, originalModifier: modifier, value }
  }
}

export const signModifier = <T extends RecordAny>(
  signs?: string | string[]
) => {
  const safeSigns = _.isUndefined(signs) ? ['', '-'] : _.flatten([signs])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (result: T, value: any, modifier: string) => {
    _.forEach(safeSigns, (sign) => {
      result[`${sign}${modifier}` as keyof T] = _.isPlainObject(value)
        ? { sign, originalModifier: modifier, ...value }
        : { sign, originalModifier: modifier, value }
    })
  }
}

export const addDurationWithGravity =
  <T extends RecordAny>() =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (result: T, value: any, modifier: string) => {
    const duration = Math.pow(
      Number(value.originalModifier ?? modifier),
      0.25
    ).toFixed(2)

    result[modifier as keyof T] = _.isPlainObject(value)
      ? { duration, originalModifier: modifier, ...value }
      : { duration, originalModifier: modifier, value }
  }
