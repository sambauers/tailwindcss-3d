import { ensure } from '../../ensure'

describe('utilities', () => {
  describe('ensure', () => {
    describe('ensure()', () => {
      it('validates a given type', () => {
        expect(ensure('string', 'some_string', 'fallback')).toBe('some_string')
        expect(ensure('number', 1234, 0)).toBe(1234)
        expect(ensure('boolean', true, false)).toBe(true)
        expect(ensure('object', { some: 'object' }, {})).toStrictEqual({
          some: 'object',
        })
      })

      it('falls back to the default when needed', () => {
        expect(ensure('boolean', 1234, false)).toBe(false)
        expect(ensure('string', {}, 'some_string')).toBe('some_string')
        expect(ensure('object', true, { some: 'object' })).toStrictEqual({
          some: 'object',
        })
      })
    })
  })
})
