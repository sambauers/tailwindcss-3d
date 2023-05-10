import includes from 'lodash/includes'
import isString from 'lodash/isString'

import { generateGuard } from '@/utils/generate-guard'

export type Dimension = '3d' | '2d'

export const isDimension = generateGuard<Dimension>([
  isString,
  (maybe) => includes(['3d', '2d'], maybe),
])

export const normaliseDimension = (dimension?: string): Dimension =>
  isDimension(dimension) ? dimension : '3d'
