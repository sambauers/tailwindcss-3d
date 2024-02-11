type Primitives =
  | string
  | number
  | bigint
  | boolean
  | symbol
  | undefined
  | object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | ((...args: any[]) => any)

type PrimitiveStrings =
  | 'string'
  | 'number'
  | 'bigint'
  | 'boolean'
  | 'symbol'
  | 'undefined'
  | 'object'
  | 'function'

export const ensure = <T extends Primitives>(
  type: PrimitiveStrings | PrimitiveStrings[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  maybe: any,
  fallback: T,
): T => {
  const safeTypes = [type].flat()
  const isValidType = safeTypes.some((safeType) => typeof maybe === safeType)
  return isValidType ? maybe : fallback
}

export const ensureBoolean = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  maybe: any,
  fallback: boolean,
) => ensure('boolean', maybe, fallback)
