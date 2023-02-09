import { normaliseUnitValue } from '../../css-value'

describe('utilities', () => {
  describe('css-value', () => {
    describe('normaliseUnitValue()', () => {
      it('normalises a number by default', () => {
        expect(normaliseUnitValue('123')).toBe('123')
      })

      it('normalises a number and defaults to zero by default', () => {
        expect(normaliseUnitValue('')).toBe('0')
      })

      it('accepts a different default value', () => {
        expect(normaliseUnitValue('', '123')).toBe('123')
      })

      it('handles an undefined value', () => {
        expect(normaliseUnitValue(undefined)).toBe('0')
      })

      it('handles an undefined value, with a custom default value', () => {
        expect(normaliseUnitValue(undefined, '123')).toBe('123')
      })

      it('accepts empty options', () => {
        expect(normaliseUnitValue('', undefined, {})).toBe('0')
      })

      it('accepts default nil option', () => {
        expect(normaliseUnitValue('', undefined, { defaultNil: '0' })).toBe('0')
        expect(normaliseUnitValue('', undefined, { defaultNil: 'none' })).toBe(
          'none'
        )
        expect(normaliseUnitValue('', undefined, { defaultNil: '' })).toBe('')
      })

      it('allows none by default', () => {
        expect(normaliseUnitValue('none')).toBe('none')
      })

      it('accepts allow none option', () => {
        expect(normaliseUnitValue('none', undefined, { allowNone: true })).toBe(
          'none'
        )
        expect(
          normaliseUnitValue('none', undefined, { allowNone: false })
        ).toBe('0')
      })

      it('allows vars by default', () => {
        expect(normaliseUnitValue('var(--tw-xxx)')).toBe('var(--tw-xxx)')
      })

      it('allows var patterns with fallback value', () => {
        expect(normaliseUnitValue('var(--tw-xxx, 24px)')).toBe(
          'var(--tw-xxx, 24px)'
        )
      })

      it('rejects invalid var patterns', () => {
        expect(normaliseUnitValue('var(tw-xxx)')).toBe('0')
      })

      it('rejects invalid var patterns and returns custom defualt value', () => {
        expect(normaliseUnitValue('var(tw-xxx)', '123')).toBe('123')
      })

      it('accepts allow var option', () => {
        expect(
          normaliseUnitValue('var(--tw-xxx)', undefined, { allowVar: true })
        ).toBe('var(--tw-xxx)')
        expect(
          normaliseUnitValue('var(--tw-xxx)', undefined, { allowVar: false })
        ).toBe('0')
      })

      it('does not allow calc by default', () => {
        expect(normaliseUnitValue('calc(1px + 20%)')).toBe('0')
      })

      it('rejects invalid calc patterns', () => {
        expect(normaliseUnitValue('calc(1px +20%)')).toBe('0')
      })

      it('rejects invalid calc patterns and returns custom defualt value', () => {
        expect(normaliseUnitValue('calc(1px +20%)', '123')).toBe('123')
      })

      it('accepts allow calc option', () => {
        expect(
          normaliseUnitValue('calc(1px + 20%)', undefined, { allowCalc: true })
        ).toBe('calc(1px + 20%)')
        expect(
          normaliseUnitValue('calc(1px + 20%)', undefined, { allowCalc: false })
        ).toBe('0')
      })

      it('is OK with calc patterns containing vars', () => {
        expect(
          normaliseUnitValue('calc(var(--tw-xxx) + 20%)', undefined, {
            allowCalc: true,
          })
        ).toBe('calc(var(--tw-xxx) + 20%)')
        expect(
          normaliseUnitValue('calc(var(--tw-xxx) + var(--tw-yyy))', undefined, {
            allowCalc: true,
          })
        ).toBe('calc(var(--tw-xxx) + var(--tw-yyy))')
      })

      it('accepts default unit option', () => {
        expect(
          normaliseUnitValue('123%', undefined, { defaultUnit: '%' })
        ).toBe('123%')
      })

      it('accepts valid units option', () => {
        expect(
          normaliseUnitValue('123%', undefined, { validUnits: ['%'] })
        ).toBe('123%')
      })

      it('mixes default unit into valid units option', () => {
        expect(
          normaliseUnitValue('123px', undefined, {
            defaultUnit: 'px',
            validUnits: ['%'],
          })
        ).toBe('123px')
      })

      it('returns default when it can not discern a valid numeric value', () => {
        expect(normaliseUnitValue('px')).toBe('0')
      })

      it('removes the unit suffix when value evaluates to zero', () => {
        expect(normaliseUnitValue('0px')).toBe('0')
      })

      it('adds the default unit suffix when value evaluates to zero', () => {
        expect(normaliseUnitValue('0', undefined, { defaultUnit: 'px' })).toBe(
          '0px'
        )
        expect(
          normaliseUnitValue('0px', undefined, { defaultUnit: 'px' })
        ).toBe('0px')
      })

      it('returns the default nil when value evaluates to zero', () => {
        expect(
          normaliseUnitValue('0px', undefined, { defaultNil: 'none' })
        ).toBe('none')
      })

      it('allows decimals by default', () => {
        expect(normaliseUnitValue('123.123')).toBe('123.123')
      })

      it('accepts allow decimal option', () => {
        expect(
          normaliseUnitValue('123.123', undefined, { allowDecimal: true })
        ).toBe('123.123')
        expect(
          normaliseUnitValue('123.123', undefined, { allowDecimal: false })
        ).toBe('123')
        expect(
          normaliseUnitValue('123.678', undefined, { allowDecimal: false })
        ).toBe('124')
      })

      it('accepts disallow values option', () => {
        expect(
          normaliseUnitValue('10', undefined, { disallowValues: [10, 20, 30] })
        ).toBe('0')
        expect(
          normaliseUnitValue('11', undefined, { disallowValues: [10, 20, 30] })
        ).toBe('11')
      })

      it('returns the custom default value when value is disallowed', () => {
        expect(
          normaliseUnitValue('10', '123', { disallowValues: [10, 20, 30] })
        ).toBe('123')
        expect(
          normaliseUnitValue('11', '123', { disallowValues: [10, 20, 30] })
        ).toBe('11')
      })

      it('accepts upper limit option as number', () => {
        expect(normaliseUnitValue('8', undefined, { upperLimit: 10 })).toBe('8')
        expect(normaliseUnitValue('9', undefined, { upperLimit: 10 })).toBe('9')
        expect(normaliseUnitValue('10', undefined, { upperLimit: 10 })).toBe(
          '10'
        )
        expect(normaliseUnitValue('11', undefined, { upperLimit: 10 })).toBe(
          '10'
        )
        expect(normaliseUnitValue('12', undefined, { upperLimit: 10 })).toBe(
          '10'
        )
      })

      it('accepts inclusive upper limit option', () => {
        expect(
          normaliseUnitValue('8', undefined, {
            upperLimit: { limit: 10, inclusive: true },
          })
        ).toBe('8')
        expect(
          normaliseUnitValue('9', undefined, {
            upperLimit: { limit: 10, inclusive: true },
          })
        ).toBe('9')
        expect(
          normaliseUnitValue('10', undefined, {
            upperLimit: { limit: 10, inclusive: true },
          })
        ).toBe('10')
        expect(
          normaliseUnitValue('11', undefined, {
            upperLimit: { limit: 10, inclusive: true },
          })
        ).toBe('10')
        expect(
          normaliseUnitValue('12', undefined, {
            upperLimit: { limit: 10, inclusive: true },
          })
        ).toBe('10')
      })

      it('accepts exclusive upper limit option', () => {
        expect(
          normaliseUnitValue('8', undefined, {
            upperLimit: { limit: 10, inclusive: false },
          })
        ).toBe('8')
        expect(
          normaliseUnitValue('9', undefined, {
            upperLimit: { limit: 10, inclusive: false },
          })
        ).toBe('9')
        expect(
          normaliseUnitValue('10', undefined, {
            upperLimit: { limit: 10, inclusive: false },
          })
        ).toBe('9')
        expect(
          normaliseUnitValue('11', undefined, {
            upperLimit: { limit: 10, inclusive: false },
          })
        ).toBe('9')
        expect(
          normaliseUnitValue('12', undefined, {
            upperLimit: { limit: 10, inclusive: false },
          })
        ).toBe('9')
      })

      it('accepts upper limit option with custom adjust by value but ignores it if inclusive', () => {
        expect(
          normaliseUnitValue('8', undefined, {
            upperLimit: { limit: 10, adjustBy: 0.1 },
          })
        ).toBe('8')
        expect(
          normaliseUnitValue('9', undefined, {
            upperLimit: { limit: 10, adjustBy: 0.1 },
          })
        ).toBe('9')
        expect(
          normaliseUnitValue('10', undefined, {
            upperLimit: { limit: 10, adjustBy: 0.1 },
          })
        ).toBe('10')
        expect(
          normaliseUnitValue('11', undefined, {
            upperLimit: { limit: 10, adjustBy: 0.1 },
          })
        ).toBe('10')
        expect(
          normaliseUnitValue('12', undefined, {
            upperLimit: { limit: 10, adjustBy: 0.1 },
          })
        ).toBe('10')
      })

      it('accepts exclusive upper limit option with custom adjust by value', () => {
        expect(
          normaliseUnitValue('8', undefined, {
            upperLimit: { limit: 10, inclusive: false, adjustBy: 0.1 },
          })
        ).toBe('8')
        expect(
          normaliseUnitValue('9', undefined, {
            upperLimit: { limit: 10, inclusive: false, adjustBy: 0.1 },
          })
        ).toBe('9')
        expect(
          normaliseUnitValue('10', undefined, {
            upperLimit: { limit: 10, inclusive: false, adjustBy: 0.1 },
          })
        ).toBe('9.9')
        expect(
          normaliseUnitValue('11', undefined, {
            upperLimit: { limit: 10, inclusive: false, adjustBy: 0.1 },
          })
        ).toBe('9.9')
        expect(
          normaliseUnitValue('12', undefined, {
            upperLimit: { limit: 10, inclusive: false, adjustBy: 0.1 },
          })
        ).toBe('9.9')
      })

      it('accepts exclusive upper limit option and correctly handles decimals', () => {
        expect(
          normaliseUnitValue('0.8', undefined, {
            upperLimit: { limit: 1, inclusive: false, adjustBy: 0.01 },
          })
        ).toBe('0.8')
        expect(
          normaliseUnitValue('0.9', undefined, {
            upperLimit: { limit: 1, inclusive: false, adjustBy: 0.01 },
          })
        ).toBe('0.9')
        expect(
          normaliseUnitValue('1', undefined, {
            upperLimit: { limit: 1, inclusive: false, adjustBy: 0.01 },
          })
        ).toBe('0.99')
        expect(
          normaliseUnitValue('1.1', undefined, {
            upperLimit: { limit: 1, inclusive: false, adjustBy: 0.01 },
          })
        ).toBe('0.99')
        expect(
          normaliseUnitValue('1.2', undefined, {
            upperLimit: { limit: 1, inclusive: false, adjustBy: 0.01 },
          })
        ).toBe('0.99')
      })

      it('accepts lower limit option as number', () => {
        expect(normaliseUnitValue('8', undefined, { lowerLimit: 10 })).toBe(
          '10'
        )
        expect(normaliseUnitValue('9', undefined, { lowerLimit: 10 })).toBe(
          '10'
        )
        expect(normaliseUnitValue('10', undefined, { lowerLimit: 10 })).toBe(
          '10'
        )
        expect(normaliseUnitValue('11', undefined, { lowerLimit: 10 })).toBe(
          '11'
        )
        expect(normaliseUnitValue('12', undefined, { lowerLimit: 10 })).toBe(
          '12'
        )
      })

      it('accepts inclusive lower limit option', () => {
        expect(
          normaliseUnitValue('8', undefined, {
            lowerLimit: { limit: 10, inclusive: true },
          })
        ).toBe('10')
        expect(
          normaliseUnitValue('9', undefined, {
            lowerLimit: { limit: 10, inclusive: true },
          })
        ).toBe('10')
        expect(
          normaliseUnitValue('10', undefined, {
            lowerLimit: { limit: 10, inclusive: true },
          })
        ).toBe('10')
        expect(
          normaliseUnitValue('11', undefined, {
            lowerLimit: { limit: 10, inclusive: true },
          })
        ).toBe('11')
        expect(
          normaliseUnitValue('12', undefined, {
            lowerLimit: { limit: 10, inclusive: true },
          })
        ).toBe('12')
      })

      it('accepts exclusive lower limit option', () => {
        expect(
          normaliseUnitValue('8', undefined, {
            lowerLimit: { limit: 10, inclusive: false },
          })
        ).toBe('11')
        expect(
          normaliseUnitValue('9', undefined, {
            lowerLimit: { limit: 10, inclusive: false },
          })
        ).toBe('11')
        expect(
          normaliseUnitValue('10', undefined, {
            lowerLimit: { limit: 10, inclusive: false },
          })
        ).toBe('11')
        expect(
          normaliseUnitValue('11', undefined, {
            lowerLimit: { limit: 10, inclusive: false },
          })
        ).toBe('11')
        expect(
          normaliseUnitValue('12', undefined, {
            lowerLimit: { limit: 10, inclusive: false },
          })
        ).toBe('12')
      })

      it('accepts lower limit option with custom adjust by value but ignores it if inclusive', () => {
        expect(
          normaliseUnitValue('8', undefined, {
            lowerLimit: { limit: 10, adjustBy: 0.1 },
          })
        ).toBe('10')
        expect(
          normaliseUnitValue('9', undefined, {
            lowerLimit: { limit: 10, adjustBy: 0.1 },
          })
        ).toBe('10')
        expect(
          normaliseUnitValue('10', undefined, {
            lowerLimit: { limit: 10, adjustBy: 0.1 },
          })
        ).toBe('10')
        expect(
          normaliseUnitValue('11', undefined, {
            lowerLimit: { limit: 10, adjustBy: 0.1 },
          })
        ).toBe('11')
        expect(
          normaliseUnitValue('12', undefined, {
            lowerLimit: { limit: 10, adjustBy: 0.1 },
          })
        ).toBe('12')
      })

      it('accepts exclusive lower limit option with custom adjust by value', () => {
        expect(
          normaliseUnitValue('8', undefined, {
            lowerLimit: { limit: 10, inclusive: false, adjustBy: 0.1 },
          })
        ).toBe('10.1')
        expect(
          normaliseUnitValue('9', undefined, {
            lowerLimit: { limit: 10, inclusive: false, adjustBy: 0.1 },
          })
        ).toBe('10.1')
        expect(
          normaliseUnitValue('10', undefined, {
            lowerLimit: { limit: 10, inclusive: false, adjustBy: 0.1 },
          })
        ).toBe('10.1')
        expect(
          normaliseUnitValue('11', undefined, {
            lowerLimit: { limit: 10, inclusive: false, adjustBy: 0.1 },
          })
        ).toBe('11')
        expect(
          normaliseUnitValue('12', undefined, {
            lowerLimit: { limit: 10, inclusive: false, adjustBy: 0.1 },
          })
        ).toBe('12')
      })

      it('accepts exclusive lower limit option and correctly handles decimals', () => {
        expect(
          normaliseUnitValue('0.8', undefined, {
            lowerLimit: { limit: 1, inclusive: false, adjustBy: 0.01 },
          })
        ).toBe('1.01')
        expect(
          normaliseUnitValue('0.9', undefined, {
            lowerLimit: { limit: 1, inclusive: false, adjustBy: 0.01 },
          })
        ).toBe('1.01')
        expect(
          normaliseUnitValue('1', undefined, {
            lowerLimit: { limit: 1, inclusive: false, adjustBy: 0.01 },
          })
        ).toBe('1.01')
        expect(
          normaliseUnitValue('1.1', undefined, {
            lowerLimit: { limit: 1, inclusive: false, adjustBy: 0.01 },
          })
        ).toBe('1.1')
        expect(
          normaliseUnitValue('1.2', undefined, {
            lowerLimit: { limit: 1, inclusive: false, adjustBy: 0.01 },
          })
        ).toBe('1.2')
      })
    })
  })
})
