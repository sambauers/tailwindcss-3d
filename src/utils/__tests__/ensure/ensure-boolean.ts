import { ensureBoolean } from '../../ensure'

describe('utilities', () => {
  describe('ensure', () => {
    describe('ensureBoolean()', () => {
      it('validates a boolean type', () => {
        expect(ensureBoolean(true, false)).toBe(true)
        expect(ensureBoolean(false, true)).toBe(false)
      })

      it('falls back to the default when needed', () => {
        expect(ensureBoolean(1234, false)).toBe(false)
        expect(ensureBoolean('some_string', true)).toBe(true)
        expect(ensureBoolean({}, true)).toBe(true)
      })
    })
  })
})
