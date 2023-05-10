import { chain } from 'lodash'

import { signModifier } from '../../lodash-transformers'

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
    describe('signModifier()', () => {
      it('transforms an object when no signs are provided', () => {
        const outputObject = chain(INPUT_WITH_VALUE)
          .transform(signModifier(), {})
          .value()

        expect(outputObject).toStrictEqual({
          '1': { sign: '', originalModifier: '1', value: '111' },
          '-1': { sign: '-', originalModifier: '1', value: '111' },
          '2': { sign: '', originalModifier: '2', value: '222' },
          '-2': { sign: '-', originalModifier: '2', value: '222' },
          '3': { sign: '', originalModifier: '3', value: '333' },
          '-3': { sign: '-', originalModifier: '3', value: '333' },
        })
      })

      it('transforms an object when signs are provided', () => {
        const outputObject = chain(INPUT_WITH_VALUE)
          .transform(signModifier(['+', '-', '#']), {})
          .value()

        expect(outputObject).toStrictEqual({
          '+1': { sign: '+', originalModifier: '1', value: '111' },
          '-1': { sign: '-', originalModifier: '1', value: '111' },
          '#1': { sign: '#', originalModifier: '1', value: '111' },
          '+2': { sign: '+', originalModifier: '2', value: '222' },
          '-2': { sign: '-', originalModifier: '2', value: '222' },
          '#2': { sign: '#', originalModifier: '2', value: '222' },
          '+3': { sign: '+', originalModifier: '3', value: '333' },
          '-3': { sign: '-', originalModifier: '3', value: '333' },
          '#3': { sign: '#', originalModifier: '3', value: '333' },
        })
      })

      it('transforms an object when a single sign is provided', () => {
        const outputObject = chain(INPUT_WITH_VALUE)
          .transform(signModifier('#'), {})
          .value()

        expect(outputObject).toStrictEqual({
          '#1': { sign: '#', originalModifier: '1', value: '111' },
          '#2': { sign: '#', originalModifier: '2', value: '222' },
          '#3': { sign: '#', originalModifier: '3', value: '333' },
        })
      })

      it('merges existing values from previous transformations', () => {
        const outputObject = chain(INPUT_WITH_OBJECT)
          .transform(signModifier(), {})
          .value()

        expect(outputObject).toStrictEqual({
          '1': { sign: '', originalModifier: '1', value: '111' },
          '-1': { sign: '-', originalModifier: '1', value: '111' },
          '2': { sign: '', originalModifier: '2', value: '222' },
          '-2': { sign: '-', originalModifier: '2', value: '222' },
          '3': { sign: '', originalModifier: '3', value: '333' },
          '-3': { sign: '-', originalModifier: '3', value: '333' },
        })
      })
    })
  })
})
