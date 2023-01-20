import _ from 'lodash'
import { nameModifier } from '../../lodash-transformers'

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
    describe('nameModifier()', () => {
      it('transforms an object when no name is provided, but does not append the property', () => {
        const outputObject = _.chain(INPUT_WITH_VALUE)
          .transform(nameModifier(), {})
          .value()

        expect(outputObject).toStrictEqual({
          '1': { name: undefined, originalModifier: '1', value: '111' },
          '2': { name: undefined, originalModifier: '2', value: '222' },
          '3': { name: undefined, originalModifier: '3', value: '333' },
        })
      })

      it('transforms an object when name is an empty string, but does not append the property', () => {
        const outputObject = _.chain(INPUT_WITH_VALUE)
          .transform(nameModifier(''), {})
          .value()

        expect(outputObject).toStrictEqual({
          '1': { name: '', originalModifier: '1', value: '111' },
          '2': { name: '', originalModifier: '2', value: '222' },
          '3': { name: '', originalModifier: '3', value: '333' },
        })
      })

      it('transforms an object when name is provided, and appends the property', () => {
        const outputObject = _.chain(INPUT_WITH_VALUE)
          .transform(nameModifier('bounce'), {})
          .value()

        expect(outputObject).toStrictEqual({
          bounce: { name: 'bounce', originalModifier: '1', value: '111' },
          'bounce-2': { name: 'bounce', originalModifier: '2', value: '222' },
          'bounce-3': { name: 'bounce', originalModifier: '3', value: '333' },
        })
      })

      it('silences a specific modifier', () => {
        const outputObject = _.chain(INPUT_WITH_VALUE)
          .transform(nameModifier('bounce', '2'), {})
          .value()

        expect(outputObject).toStrictEqual({
          'bounce-1': { name: 'bounce', originalModifier: '1', value: '111' },
          bounce: { name: 'bounce', originalModifier: '2', value: '222' },
          'bounce-3': { name: 'bounce', originalModifier: '3', value: '333' },
        })
      })

      it('merges existing values from previous transformations', () => {
        const outputObject = _.chain(INPUT_WITH_OBJECT)
          .transform(nameModifier('bounce'), {})
          .value()

        expect(outputObject).toStrictEqual({
          bounce: { name: 'bounce', originalModifier: '1', value: '111' },
          'bounce-2': { name: 'bounce', originalModifier: '2', value: '222' },
          'bounce-3': { name: 'bounce', originalModifier: '3', value: '333' },
        })
      })
    })
  })
})
