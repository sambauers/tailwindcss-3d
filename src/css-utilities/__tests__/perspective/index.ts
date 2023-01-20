import { perspective } from '../../perspective'
import { MatchUtilitiesMock } from '../../__mocks__/match-utilities-mock'

describe('css-utilities', () => {
  describe('perspective', () => {
    describe('defaultTheme', () => {
      it('is an object', () => {
        expect(perspective.defaultTheme).toStrictEqual(expect.any(Object))
      })
    })

    describe('utilities', () => {
      it('is a function', () => {
        expect(perspective.utilities).toStrictEqual(expect.any(Function))
      })

      it('returns void', () => {
        const matchUtilitiesMock = new MatchUtilitiesMock()
        const matchUtilities = jest
          .fn()
          .mockImplementation(matchUtilitiesMock.implementation)
        const theme = jest
          .fn()
          .mockReturnValue({ 250: '250px', 500: '500px', 750: '750px' })

        expect(perspective.utilities({ matchUtilities, theme })).toBeUndefined()
        expect(matchUtilities).toHaveBeenCalledTimes(1)
        expect(matchUtilitiesMock.utilityCallValues.length).toBe(3)
        expect(theme).toHaveBeenCalledTimes(1)
      })
    })
  })
})
