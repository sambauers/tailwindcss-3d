import { normaliseUnionValue } from '../../css-value'

describe('utilities', () => {
  describe('css-values', () => {
    describe('normaliseUnionValue()', () => {
      it('returns the default', () => {
        expect(normaliseUnionValue('foo', 'foo', ['foo', 'bar', 'baz'])).toBe(
          'foo'
        )
      })

      it('returns any valid value', () => {
        expect(normaliseUnionValue('bar', 'foo', ['foo', 'bar', 'baz'])).toBe(
          'bar'
        )
        expect(normaliseUnionValue('baz', 'foo', ['foo', 'bar', 'baz'])).toBe(
          'baz'
        )
      })

      it('standardises matches', () => {
        expect(
          normaliseUnionValue('  bar  ', 'foo', ['foo', 'bar', 'baz'])
        ).toBe('bar')
        expect(normaliseUnionValue('BaR', 'foo', ['foo', 'bar', 'baz'])).toBe(
          'bar'
        )
      })

      it('returns the default if value is not in allowed values', () => {
        expect(normaliseUnionValue('yap', 'foo', ['foo', 'bar', 'baz'])).toBe(
          'foo'
        )
        expect(normaliseUnionValue('yap', 'bar', ['foo', 'bar', 'baz'])).toBe(
          'bar'
        )
      })

      it('returns the default if value is not valid', () => {
        expect(
          normaliseUnionValue(undefined, 'foo', ['foo', 'bar', 'baz'])
        ).toBe('foo')
      })

      it('ignores invalid allowed values', () => {
        // @ts-expect-error testing
        expect(normaliseUnionValue('baz', 'foo', ['foo', 123, 'baz'])).toBe(
          'baz'
        )
      })
    })
  })
})
