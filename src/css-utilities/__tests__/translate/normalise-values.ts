import { compileCSS } from '../../../../jest/utils'

describe('css-utilities', () => {
  describe('Translate', () => {
    describe('normaliseValues()', () => {
      it('will not produce CSS if no valid translate values are present in the theme', async () => {
        const css = await compileCSS(
          '<div class="translate-x-0"></div>',
          false,
          {
            // @ts-expect-error test
            translate: { '0': 0 },
          },
        )

        expect(css).toBe('')
      })
    })
  })
})
