import { perspectiveOrigin } from '../../perspective-origin'
import { MatchUtilitiesMock } from '../../__mocks__/match-utilities-mock'

describe('css-utilities', () => {
  describe('perspectiveOrigin', () => {
    describe('defaultTheme', () => {
      it('is an object', () => {
        expect(perspectiveOrigin.defaultTheme).toStrictEqual(expect.any(Object))
      })
    })

    describe('utilities', () => {
      it('is a function', () => {
        expect(perspectiveOrigin.utilities).toStrictEqual(expect.any(Function))
      })

      it('returns void', () => {
        const matchUtilitiesMock = new MatchUtilitiesMock()
        const matchUtilities = jest
          .fn()
          .mockImplementation(matchUtilitiesMock.implementation)
        const theme = jest
          .fn()
          .mockReturnValue({ center: 'center', top: 'top' })

        expect(
          perspectiveOrigin.utilities({ matchUtilities, theme })
        ).toBeUndefined()
        expect(matchUtilities).toHaveBeenCalledTimes(1)
        expect(matchUtilitiesMock.utilityCallValues.length).toBe(2)
        expect(theme).toHaveBeenCalledTimes(1)
      })
    })
  })
})
