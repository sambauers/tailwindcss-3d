import _ from 'lodash'
import { generateGuard } from './generate-guard'

export const VALID_LENGTH_UNITS = [
  'ch',
  'em',
  'ex',
  'ic',
  'rem',
  'vh',
  'vw',
  'vmax',
  'vmin',
  'vb',
  'vi',
  'cqw',
  'cqh',
  'cqi',
  'cqb',
  'cqmin',
  'cqmax',
  'px',
  'cm',
  'mm',
  'Q',
  'in',
  'pc',
  'pt',
]

export const VALID_ANGLE_UNITS = ['deg', 'grad', 'rad', 'turn']

export const VALID_TIME_UNITS = ['s', 'ms']

export type UnsafeCSSValue = string | number | undefined

export const toStringValue = (value: UnsafeCSSValue): string | undefined => {
  if (_.isString(value)) {
    return value.trim()
  }

  if (_.isFinite(value)) {
    return String(value)
  }

  return undefined
}

export const toNumericValue = (value: UnsafeCSSValue): number | undefined => {
  if (_.isFinite(value)) {
    return Number(value)
  }

  if (_.isString(value)) {
    const trimmed = value.trim()
    if (trimmed === '') {
      return undefined
    }

    const maybeNumber = Number(trimmed)
    if (isNaN(maybeNumber)) {
      return undefined
    }

    return maybeNumber
  }

  return undefined
}

interface NumericValueAndUnit {
  value: number | undefined
  unit: string | undefined
}

export const toNumericValueAndUnit = (
  value: UnsafeCSSValue,
  validUnits?: string | string[]
): NumericValueAndUnit => {
  const stringValue = toStringValue(value)

  const evaluated: NumericValueAndUnit = {
    value: undefined,
    unit: undefined,
  }

  if (_.isUndefined(stringValue)) {
    return evaluated
  }

  if (stringValue === '') {
    return evaluated
  }

  const strippedStringValue = stringValue.replace(/\s/g, '')

  const safeValidUnits = _.chain(validUnits)
    .castArray()
    .uniq()
    .filter(generateGuard<string>([_.isString, (maybe) => maybe !== '']))
    .value()

  if (safeValidUnits.length > 0) {
    const unitsUnion = safeValidUnits.join('|')
    const unitsMatch = strippedStringValue.match(
      new RegExp(`(?:${unitsUnion})$`)
    )

    if (_.isArray(unitsMatch) && unitsMatch.length === 1) {
      evaluated.unit = unitsMatch[0]
    }
  }

  // Simple numbers without units
  const numberValue = toNumericValue(strippedStringValue)
  if (_.isNumber(numberValue)) {
    evaluated.value = numberValue
    return evaluated
  }

  const unitlessStringValue = _.isString(evaluated.unit)
    ? strippedStringValue.replace(new RegExp(`${evaluated.unit}$`), '')
    : strippedStringValue

  const unitlessNumberValue = toNumericValue(unitlessStringValue)

  if (_.isNumber(unitlessNumberValue)) {
    evaluated.value = unitlessNumberValue
    return evaluated
  }

  const rescueStringValue = unitlessStringValue
    .replace(/[^\d.-]/g, '')
    .replace(/\b-/g, '')
  const rescueNumberValue = toNumericValue(rescueStringValue)
  if (_.isNumber(rescueNumberValue)) {
    evaluated.value = rescueNumberValue
    return evaluated
  }

  return evaluated
}

type NormaliseUnionValueFunction = (
  value: UnsafeCSSValue,
  defaultValue?: UnsafeCSSValue,
  allowedValues?: string | string[]
) => string | undefined

export const normaliseUnionValue: NormaliseUnionValueFunction = (
  value,
  defaultValue,
  allowedValues
): string | undefined => {
  const safeValue = toStringValue(value)
  const safeDefaultValue = toStringValue(defaultValue)

  if (_.isUndefined(safeValue)) {
    return safeDefaultValue
  }

  const safeAllowedValues = _.chain(defaultValue)
    .castArray()
    .concat(allowedValues)
    .uniq()
    .filter(_.isString)
    .map(_.trim)
    .value()

  const matchedIndex = _.chain(safeAllowedValues)
    .map(_.toLower)
    .indexOf(_.toLower(safeValue))
    .value()

  if (matchedIndex !== -1) {
    return safeAllowedValues[matchedIndex]
  }

  return safeDefaultValue
}

interface Limit {
  limit: number
  inclusive?: boolean
  adjustBy?: number
}

const isLimit = generateGuard<Limit>([
  _.isPlainObject,
  (maybe) => _.isNumber(_.get(maybe, 'limit')),
  (maybe) =>
    _.has(maybe, 'inclusive') ? _.isBoolean(_.get(maybe, 'inclusive')) : true,
  (maybe) =>
    _.has(maybe, 'adjustBy') ? _.isNumber(_.get(maybe, 'adjustBy')) : true,
])

// Not a type guard
const isVar = (maybe: string) =>
  /^var\(\s*--[a-zA-Z0-9-]+\s*(,\s*.+)?\s*\)$/.test(maybe)

// Not a type guard
const isCalc = (maybe: string) =>
  /^calc\(\s*(?:var\(\s*--[a-zA-Z0-9-]+\s*(,\s*.+)?\s*\)|[0-9]+[a-zA-Z%]*)\s+[*/+-]\s+(?:var\(\s*--[a-zA-Z0-9-]+\s*(,\s*.+)?\s*\)|[0-9]+[a-zA-Z%]*)\s*\)$/.test(
    maybe
  )

interface NormaliseUnitValueOptions {
  defaultNil?: '0' | 'none' | ''
  allowNone?: boolean
  allowVar?: boolean
  allowCalc?: boolean
  defaultUnit?: string
  validUnits?: string[]
  disallowValues?: number | number[]
  allowDecimal?: boolean
  upperLimit?: number | Limit
  lowerLimit?: number | Limit
}

type NormaliseUnitValueFunction = (
  value: UnsafeCSSValue,
  defaultValue?: UnsafeCSSValue,
  options?: NormaliseUnitValueOptions
) => string | undefined

export const normaliseUnitValue: NormaliseUnitValueFunction = (
  value,
  defaultValue,
  options
) => {
  const safeValue = toStringValue(value)
  const safeDefaultValue = toStringValue(defaultValue)

  const {
    defaultNil,
    allowNone,
    allowVar,
    allowCalc,
    defaultUnit,
    validUnits,
    disallowValues,
    allowDecimal,
    upperLimit,
    lowerLimit,
  }: NormaliseUnitValueOptions =
    _.isObject(options) && _.isPlainObject(options) ? options : {}

  const safeDefaultNil =
    _.isString(defaultNil) && _.includes(['0', 'none', ''], defaultNil)
      ? defaultNil
      : '0'

  if (_.isUndefined(safeValue)) {
    return safeDefaultValue ?? safeDefaultNil
  }

  const safeAllowNone = _.isBoolean(allowNone) ? allowNone : true

  if (safeAllowNone && safeValue.toLowerCase() === 'none') {
    return 'none'
  }

  const safeAllowVar = _.isBoolean(allowVar) ? allowVar : true

  // Return a var() if that is allowed - fairly coarse validation
  if (safeValue.startsWith('var(')) {
    return safeAllowVar && isVar(safeValue)
      ? safeValue
      : safeDefaultValue ?? safeDefaultNil
  }

  const safeAllowCalc = _.isBoolean(allowCalc) ? allowCalc : false

  // Return a calc() if that is allowed - fairly coarse validation
  if (safeValue.startsWith('calc(')) {
    return safeAllowCalc && isCalc(safeValue)
      ? safeValue
      : safeDefaultValue ?? safeDefaultNil
  }

  const safeDefaultUnit = toStringValue(defaultUnit) ?? ''
  const safeValidUnits = _.chain(safeDefaultUnit)
    .castArray()
    .concat(validUnits ?? [])
    .filter(_.isString)
    .value()

  // Get the number value and unit from the string
  const { value: safeNumberValue, unit } = toNumericValueAndUnit(
    safeValue,
    safeValidUnits
  )
  const safeUnit = unit ?? defaultUnit ?? ''

  // From here on we are dealing with number values
  if (!_.isNumber(safeNumberValue)) {
    return safeDefaultValue ?? safeDefaultNil
  }

  const safeDisallowValues = _.chain(disallowValues)
    .castArray()
    .filter(_.isNumber)
    .value()

  const safeAllowDecimal = _.isBoolean(allowDecimal) ? allowDecimal : true

  // Set up an integer value
  const safeIntegerValue = Math.round(safeNumberValue)

  // Check the value isn't disallowed
  // - use integer value if decimals are not allowed
  if (
    _.includes(
      safeDisallowValues,
      safeAllowDecimal ? safeNumberValue : safeIntegerValue
    )
  ) {
    return safeDefaultValue ?? safeDefaultNil
  }

  const evaluated: Required<NumericValueAndUnit> = {
    value: safeAllowDecimal ? safeNumberValue : safeIntegerValue,
    unit: safeUnit,
  }

  const safeUpperLimit: false | Required<Limit> = _.isNumber(upperLimit)
    ? { limit: upperLimit, inclusive: true, adjustBy: 1 }
    : isLimit(upperLimit)
    ? {
        limit: upperLimit.limit,
        inclusive: _.isBoolean(upperLimit.inclusive)
          ? upperLimit.inclusive
          : true,
        adjustBy:
          _.isNumber(upperLimit.adjustBy) && upperLimit.adjustBy !== 0
            ? upperLimit.adjustBy
            : 1,
      }
    : false

  // Set the evaluated value within the upper limit
  if (safeUpperLimit) {
    if (safeUpperLimit.inclusive) {
      if (safeNumberValue > safeUpperLimit.limit) {
        evaluated.value = safeUpperLimit.limit
      }
    } else {
      if (safeNumberValue >= safeUpperLimit.limit) {
        evaluated.value = safeUpperLimit.limit - safeUpperLimit.adjustBy
      }
    }
  }

  const safeLowerLimit: false | Required<Limit> = _.isNumber(lowerLimit)
    ? { limit: lowerLimit, inclusive: true, adjustBy: 1 }
    : isLimit(lowerLimit)
    ? {
        limit: lowerLimit.limit,
        inclusive: _.isBoolean(lowerLimit.inclusive)
          ? lowerLimit.inclusive
          : true,
        adjustBy:
          _.isNumber(lowerLimit.adjustBy) && lowerLimit.adjustBy !== 0
            ? lowerLimit.adjustBy
            : 1,
      }
    : false

  // Set the evaluated value within the lower limit
  if (safeLowerLimit) {
    if (safeLowerLimit.inclusive) {
      if (safeNumberValue < safeLowerLimit.limit) {
        evaluated.value = safeLowerLimit.limit
      }
    } else {
      if (safeNumberValue <= safeLowerLimit.limit) {
        evaluated.value = safeLowerLimit.limit + safeLowerLimit.adjustBy
      }
    }
  }

  if (evaluated.value === 0 && defaultNil) {
    return defaultNil
  }

  return `${String(evaluated.value)}${evaluated.unit}`
}

interface NormaliseAlphaValueOptions {
  percentage?: NormaliseUnitValueOptions
  number?: NormaliseUnitValueOptions
}

type NormaliseAlphaValueFunction = (
  value: UnsafeCSSValue,
  defaultValue?: UnsafeCSSValue,
  options?: NormaliseAlphaValueOptions
) => string | undefined

export const normaliseAlphaValue: NormaliseAlphaValueFunction = (
  value,
  defaultValue,
  options
) => {
  const safeValue = toStringValue(value)
  const safeDefaultValue = toStringValue(defaultValue)

  if (_.isUndefined(safeValue)) {
    return safeDefaultValue
  }

  if (safeValue.indexOf('%') !== -1) {
    return normalisePercentageValue(value, defaultValue, {
      lowerLimit: 0,
      upperLimit: 100,
      ...options?.percentage,
    })
  }

  return normaliseNumberValue(value, defaultValue, {
    lowerLimit: 0,
    upperLimit: 1,
    ...options?.number,
  })
}

export const normaliseAngleValue: NormaliseUnitValueFunction = (
  value,
  defaultValue,
  options
) =>
  normaliseUnitValue(value, defaultValue, {
    defaultUnit: 'deg',
    validUnits: VALID_ANGLE_UNITS,
    ...options,
  })

export const normaliseAnglePercentageValue: NormaliseUnitValueFunction = (
  value,
  defaultValue,
  options
) =>
  normaliseUnitValue(value, defaultValue, {
    defaultUnit: 'deg',
    validUnits: [...VALID_ANGLE_UNITS, '%'],
    ...options,
  })

export const normaliseLengthValue: NormaliseUnitValueFunction = (
  value,
  defaultValue,
  options
) =>
  normaliseUnitValue(value, defaultValue, {
    defaultUnit: 'px',
    validUnits: VALID_LENGTH_UNITS,
    ...options,
  })

export const normaliseLengthPercentageValue: NormaliseUnitValueFunction = (
  value,
  defaultValue,
  options
) =>
  normaliseUnitValue(value, defaultValue, {
    defaultUnit: 'px',
    validUnits: [...VALID_LENGTH_UNITS, '%'],
    ...options,
  })

export const normaliseNumberValue: NormaliseUnitValueFunction = (
  value,
  defaultValue,
  options
) => normaliseUnitValue(value, defaultValue, options)

export const normaliseNumberPercentageValue: NormaliseUnitValueFunction = (
  value,
  defaultValue,
  options
) =>
  normaliseUnitValue(value, defaultValue, {
    validUnits: ['', '%'],
    ...options,
  })

export const normalisePercentageValue: NormaliseUnitValueFunction = (
  value,
  defaultValue,
  options
) =>
  normaliseUnitValue(value, defaultValue, {
    defaultUnit: '%',
    validUnits: ['%'],
    ...options,
  })

export const normaliseTimeValue: NormaliseUnitValueFunction = (
  value,
  defaultValue,
  options
) =>
  normaliseUnitValue(value, defaultValue, {
    defaultUnit: 's',
    validUnits: VALID_TIME_UNITS,
    ...options,
  })

export const normaliseTimePercentageValue: NormaliseUnitValueFunction = (
  value,
  defaultValue,
  options
) =>
  normaliseUnitValue(value, defaultValue, {
    defaultUnit: 's',
    validUnits: [...VALID_TIME_UNITS, '%'],
    ...options,
  })
