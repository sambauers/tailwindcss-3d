type List = Record<string, string>

const replace = (list: List, replacements?: List): List => {
  if (
    typeof replacements !== 'object' ||
    replacements === null ||
    Array.isArray(replacements)
  ) {
    return list
  }

  const mappedListEntries: [string, string][] = Object.entries(list).map(
    ([key, value]) => [key, replacements[key] ?? value],
  )
  return Object.fromEntries(mappedListEntries)
}

const replaceValues = (list: List, replacements?: List): string =>
  Object.entries(replace(list, replacements))
    .map(([key, value]) => `${key}(${value})`)
    .join(' ')

export const legacyTransform2DValue = (replacements?: List) =>
  replaceValues(
    {
      translate: 'var(--tw-translate-x), var(--tw-translate-y)',
      rotate: 'var(--tw-rotate-z)',
      skewX: 'var(--tw-skew-x)',
      skewY: 'var(--tw-skew-y)',
      scaleX: 'var(--tw-scale-x)',
      scaleY: 'var(--tw-scale-y)',
    },
    replacements,
  )

export const legacyTransform3DValue = (replacements?: List): string =>
  replaceValues(
    {
      translate3d:
        'var(--tw-translate-x), var(--tw-translate-y), var(--tw-translate-z)',
      rotateX: 'var(--tw-rotate-x)',
      rotateY: 'var(--tw-rotate-y)',
      rotateZ: 'var(--tw-rotate-z)',
      skewX: 'var(--tw-skew-x)',
      skewY: 'var(--tw-skew-y)',
      scaleX: 'var(--tw-scale-x)',
      scaleY: 'var(--tw-scale-y)',
      scaleZ: 'var(--tw-scale-z)',
      perspective: 'var(--tw-perspective)',
    },
    replacements,
  )
