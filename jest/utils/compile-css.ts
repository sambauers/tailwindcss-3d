import { resolve } from 'node:path'

import postcss from 'postcss'
import tailwindcss from 'tailwindcss'
import { type Config } from 'tailwindcss/types/config'

import tailwindcss3d from '../../src'

type Theme = Config['theme']

export const compileCSS = async (
  html: string,
  legacy = false,
  theme?: Theme,
) => {
  const { currentTestName } = expect.getState()

  return postcss(
    tailwindcss({
      content: [
        {
          raw: html,
        },
      ],
      plugins: [tailwindcss3d({ legacy })],
      theme,
    }),
  )
    .process('@tailwind utilities;', {
      from: `${resolve(__filename)}?test=${currentTestName}`,
    })
    .then((result) => result.css)
}
