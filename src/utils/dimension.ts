import { generateGuard } from './generate-guard'
import _ from 'lodash'

export type Dimension = '3d' | '2d'

export const isDimension = generateGuard<Dimension>([
  _.isString,
  (maybe) => _.includes(['3d', '2d'], maybe),
])

export const normaliseDimension = (dimension?: string): Dimension =>
  isDimension(dimension) ? dimension : '3d'
