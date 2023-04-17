const escape = (value: string): string =>
  value.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&')

export const cssClassRegExp = (
  className: string,
  properties: string | string[]
): RegExp => {
  const escapedProperties = [properties].flat().map(escape).join(';\\s+')
  return new RegExp(
    `.*\\.${escape(className)}\\s+\\{\\s+${escapedProperties}\\s+\\}.*`
  )
}

const cssKeyframeRegExpString = (
  marker: string,
  properties: string | string[]
): string => {
  const escapedProperties = [properties].flat().map(escape).join(';\\s+')
  return `.*${escape(marker)}\\s+\\{\\s+${escapedProperties}\\s+\\}.*`
}

export const cssKeyframesRegExp = (
  name: string,
  keyframes: Array<[string, string | string[]]>
): RegExp => {
  const escapedkeyframes = [keyframes]
    .flat()
    .map(([marker, properties]) => cssKeyframeRegExpString(marker, properties))
    .join('\\s+')
  return new RegExp(
    `.*@keyframes\\s+${escape(name)}\\s+\\{\\s+${escapedkeyframes}\\s+\\}.*`
  )
}
