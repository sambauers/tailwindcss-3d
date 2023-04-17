import { compileCSS } from '../../../../jest/utils'

describe('css-utilities', () => {
  describe('Scale', () => {
    describe('normaliseValues()', () => {
      it('will not produce CSS if no valid scale values are present in the theme', async () => {
        const css = await compileCSS('<div class="scale-0"></div>', false, {
          // @ts-expect-error test
          scale: { '0': 0 },
        })

        expect(css).toBe('')
      })
    })
  })
})
