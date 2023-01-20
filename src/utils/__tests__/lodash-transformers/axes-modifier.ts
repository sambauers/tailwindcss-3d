import _ from 'lodash'
import { axesModifier } from '../../lodash-transformers'

const INPUT_WITH_VALUE = {
  '1': '111',
  '2': '222',
  '3': '333',
}

const INPUT_WITH_OBJECT = {
  '1': { value: '111' },
  '2': { value: '222' },
  '3': { value: '333' },
}

describe('utilities', () => {
  describe('lodash-transformers', () => {
    describe('axesModifier()', () => {
      it('transforms an object with defaults', () => {
        const outputObject = _.chain(INPUT_WITH_VALUE)
          .transform(axesModifier(), {})
          .value()

        expect(outputObject).toStrictEqual({
          x: { axis: 'x', originalModifier: '1', value: '111' },
          'x-2': { axis: 'x', originalModifier: '2', value: '222' },
          'x-3': { axis: 'x', originalModifier: '3', value: '333' },
          y: { axis: 'y', originalModifier: '1', value: '111' },
          'y-2': { axis: 'y', originalModifier: '2', value: '222' },
          'y-3': { axis: 'y', originalModifier: '3', value: '333' },
          z: { axis: 'z', originalModifier: '1', value: '111' },
          'z-2': { axis: 'z', originalModifier: '2', value: '222' },
          'z-3': { axis: 'z', originalModifier: '3', value: '333' },
        })
      })

      it('transforms an object with only two axes', () => {
        const outputObject = _.chain(INPUT_WITH_VALUE)
          .transform(axesModifier(['x', 'y']), {})
          .value()

        expect(outputObject).toStrictEqual({
          x: { axis: 'x', originalModifier: '1', value: '111' },
          'x-2': { axis: 'x', originalModifier: '2', value: '222' },
          'x-3': { axis: 'x', originalModifier: '3', value: '333' },
          y: { axis: 'y', originalModifier: '1', value: '111' },
          'y-2': { axis: 'y', originalModifier: '2', value: '222' },
          'y-3': { axis: 'y', originalModifier: '3', value: '333' },
        })
      })

      it('transforms an object without a silent modifier', () => {
        const outputObject = _.chain(INPUT_WITH_VALUE)
          .transform(axesModifier(undefined, ''), {})
          .value()

        expect(outputObject).toStrictEqual({
          'x-1': { axis: 'x', originalModifier: '1', value: '111' },
          'x-2': { axis: 'x', originalModifier: '2', value: '222' },
          'x-3': { axis: 'x', originalModifier: '3', value: '333' },
          'y-1': { axis: 'y', originalModifier: '1', value: '111' },
          'y-2': { axis: 'y', originalModifier: '2', value: '222' },
          'y-3': { axis: 'y', originalModifier: '3', value: '333' },
          'z-1': { axis: 'z', originalModifier: '1', value: '111' },
          'z-2': { axis: 'z', originalModifier: '2', value: '222' },
          'z-3': { axis: 'z', originalModifier: '3', value: '333' },
        })
      })

      it('merges existing values from previous transformations', () => {
        const outputObject = _.chain(INPUT_WITH_OBJECT)
          .transform(axesModifier(), {})
          .value()

        expect(outputObject).toStrictEqual({
          x: { axis: 'x', originalModifier: '1', value: '111' },
          'x-2': { axis: 'x', originalModifier: '2', value: '222' },
          'x-3': { axis: 'x', originalModifier: '3', value: '333' },
          y: { axis: 'y', originalModifier: '1', value: '111' },
          'y-2': { axis: 'y', originalModifier: '2', value: '222' },
          'y-3': { axis: 'y', originalModifier: '3', value: '333' },
          z: { axis: 'z', originalModifier: '1', value: '111' },
          'z-2': { axis: 'z', originalModifier: '2', value: '222' },
          'z-3': { axis: 'z', originalModifier: '3', value: '333' },
        })
      })
    })
  })
})
