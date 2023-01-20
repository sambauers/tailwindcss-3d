import { toNumericValueAndUnit } from '../../css-value'

describe('utilities', () => {
  describe('css-values', () => {
    describe('toNumericValueAndUnit()', () => {
      it('handles numbers', () => {
        expect(toNumericValueAndUnit(12)).toStrictEqual({
          value: 12,
          unit: undefined,
        })
        expect(toNumericValueAndUnit(1.234)).toStrictEqual({
          value: 1.234,
          unit: undefined,
        })
      })

      it('handles number-like strings', () => {
        expect(toNumericValueAndUnit('12')).toStrictEqual({
          value: 12,
          unit: undefined,
        })
        expect(toNumericValueAndUnit('1.234')).toStrictEqual({
          value: 1.234,
          unit: undefined,
        })
      })

      it('handles number-like strings with units and valid unit lists', () => {
        expect(toNumericValueAndUnit('12px', 'px')).toStrictEqual({
          value: 12,
          unit: 'px',
        })
        expect(toNumericValueAndUnit('12px', ['px'])).toStrictEqual({
          value: 12,
          unit: 'px',
        })
        expect(toNumericValueAndUnit('12px', ['px', '%'])).toStrictEqual({
          value: 12,
          unit: 'px',
        })
        expect(toNumericValueAndUnit('12%', ['px', '%'])).toStrictEqual({
          value: 12,
          unit: '%',
        })
      })

      it('returns a value even if the unit is missing', () => {
        expect(toNumericValueAndUnit('12', ['%'])).toStrictEqual({
          value: 12,
          unit: undefined,
        })
      })

      it('handles empty string valid units', () => {
        expect(toNumericValueAndUnit('12', [''])).toStrictEqual({
          value: 12,
          unit: undefined,
        })
        expect(toNumericValueAndUnit('12px', [''])).toStrictEqual({
          value: 12,
          unit: undefined,
        })
      })

      it('returns undefined if passed undefined', () => {
        expect(toNumericValueAndUnit(undefined)).toStrictEqual({
          value: undefined,
          unit: undefined,
        })
        expect(toNumericValueAndUnit(undefined, 'px')).toStrictEqual({
          value: undefined,
          unit: undefined,
        })
      })

      it('returns undefined if passed empty strings', () => {
        expect(toNumericValueAndUnit('')).toStrictEqual({
          value: undefined,
          unit: undefined,
        })
        expect(toNumericValueAndUnit('   ')).toStrictEqual({
          value: undefined,
          unit: undefined,
        })
        expect(toNumericValueAndUnit('', 'px')).toStrictEqual({
          value: undefined,
          unit: undefined,
        })
      })

      it('returns a value even if the unit is not valid', () => {
        expect(toNumericValueAndUnit('12px', ['%'])).toStrictEqual({
          value: 12,
          unit: undefined,
        })
        expect(toNumericValueAndUnit('12rpp', [''])).toStrictEqual({
          value: 12,
          unit: undefined,
        })
      })

      it('eventually returns undefined when it gives up', () => {
        expect(toNumericValueAndUnit('blah')).toStrictEqual({
          value: undefined,
          unit: undefined,
        })
        expect(toNumericValueAndUnit('blah', '')).toStrictEqual({
          value: undefined,
          unit: undefined,
        })
        expect(toNumericValueAndUnit('blah', ['%'])).toStrictEqual({
          value: undefined,
          unit: undefined,
        })
      })
    })
  })
})
