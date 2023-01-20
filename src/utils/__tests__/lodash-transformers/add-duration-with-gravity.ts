import _ from 'lodash'
import { addDurationWithGravity } from '../../lodash-transformers'

const INPUT_WITH_VALUE = {
  '1': '111',
  '2': '222',
  '3': '333',
}

const INPUT_WITH_OBJECT = {
  '1': { originalModifier: '1', value: '111' },
  '2': { originalModifier: '2', value: '222' },
  '3': { originalModifier: '3', value: '333' },
}

describe('utilities', () => {
  describe('lodash-transformers', () => {
    describe('addDurationWithGravity()', () => {
      it('transforms an object', () => {
        const outputObject = _.chain(INPUT_WITH_VALUE)
          .transform(addDurationWithGravity(), {})
          .value()

        expect(outputObject).toStrictEqual({
          '1': { duration: '1.00', originalModifier: '1', value: '111' },
          '2': { duration: '1.19', originalModifier: '2', value: '222' },
          '3': { duration: '1.32', originalModifier: '3', value: '333' },
        })
      })

      it('merges existing values from previous transformations', () => {
        const outputObject = _.chain(INPUT_WITH_OBJECT)
          .transform(addDurationWithGravity(), {})
          .value()

        expect(outputObject).toStrictEqual({
          '1': { duration: '1.00', originalModifier: '1', value: '111' },
          '2': { duration: '1.19', originalModifier: '2', value: '222' },
          '3': { duration: '1.32', originalModifier: '3', value: '333' },
        })
      })
    })
  })
})
