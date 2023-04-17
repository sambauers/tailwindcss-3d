import { compileCSS } from '../../../../jest/utils'

describe('css-utilities', () => {
  describe('Transform', () => {
    describe('normaliseValues()', () => {
      it('will not produce CSS if no valid rotate values are present in the theme', async () => {
        const css = await compileCSS('<div class="rotate-0"></div>', false, {
          // @ts-expect-error test
          rotate: { '0': 0 },
        })

        expect(css).toBe('')
      })
    })
  })
})
