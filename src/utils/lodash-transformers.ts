import isUndefined from 'lodash/isUndefined'
import flatten from 'lodash/flatten'
import forEach from 'lodash/forEach'
import isPlainObject from 'lodash/isPlainObject'
import isString from 'lodash/isString'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RecordAny = Record<string, any>

export const axesModifier = <T extends RecordAny>(
  axes?: string | string[],
  silentModifier?: string
) => {
  const safeAxes = isUndefined(axes) ? ['x', 'y', 'z'] : flatten([axes])
  const safeSilentModifier = isUndefined(silentModifier) ? '1' : silentModifier

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (result: T, value: any, modifier: string) => {
    forEach(safeAxes, (axis) => {
      const property =
        String(modifier) === String(safeSilentModifier)
          ? axis
          : `${axis}-${modifier}`

      result[property as keyof T] = isPlainObject(value)
        ? { axis, originalModifier: modifier, ...value }
        : { axis, originalModifier: modifier, value: value }
    })
  }
}

export const nameModifier = <T extends RecordAny>(
  name?: string,
  silentModifier?: string
) => {
  const safeName = isString(name) ? name : ''
  const safeSilentModifier = isString(silentModifier)
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

    result[property as keyof T] = isPlainObject(value)
      ? { name, originalModifier: modifier, ...value }
      : { name, originalModifier: modifier, value }
  }
}

export const signModifier = <T extends RecordAny>(
  signs?: string | string[]
) => {
  const safeSigns = isUndefined(signs) ? ['', '-'] : flatten([signs])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (result: T, value: any, modifier: string) => {
    forEach(safeSigns, (sign) => {
      result[`${sign}${modifier}` as keyof T] = isPlainObject(value)
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

    result[modifier as keyof T] = isPlainObject(value)
      ? { duration, originalModifier: modifier, ...value }
      : { duration, originalModifier: modifier, value }
  }
