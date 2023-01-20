import { backface } from '../../backface'
import { MatchUtilitiesMock } from '../../__mocks__/match-utilities-mock'

describe('css-utilities', () => {
  describe('backface', () => {
    describe('defaultTheme', () => {
      it('is an object', () => {
        expect(backface.defaultTheme).toStrictEqual(expect.any(Object))
      })
    })

    describe('utilities', () => {
      it('is a function', () => {
        expect(backface.utilities).toStrictEqual(expect.any(Function))
      })

      it('returns void', () => {
        const matchUtilitiesMock = new MatchUtilitiesMock()
        const matchUtilities = jest
          .fn()
          .mockImplementation(matchUtilitiesMock.implementation)
        const theme = jest
          .fn()
          .mockReturnValue({ visible: 'visible', hidden: 'hidden' })

        expect(backface.utilities({ matchUtilities, theme })).toBeUndefined()
        expect(matchUtilities).toHaveBeenCalledTimes(1)
        expect(matchUtilitiesMock.utilityCallValues.length).toBe(2)
        expect(theme).toHaveBeenCalledTimes(1)
      })
    })
  })
})
