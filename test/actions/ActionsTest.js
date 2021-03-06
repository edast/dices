import expect from 'expect'
import * as types from '../../src/actions/const'
import setName from '../../src/actions/setName'
import rollTheDice from '../../src/actions/rollTheDice'
import setRules from '../../src/actions/setRules'

describe('actions', () => {
  it('should create an action to set name', () => {
    const name = 'foo'
    const expectedAction = {
      type: types.SET_NAME,
      name
    }
    expect(setName(name)).toEqual(expectedAction)
  })

  it('should create an action to roll dices', () => {
    const expectedAction = {
      type: types.ROLL_THE_DICE
    }
    expect(rollTheDice()).toEqual(expectedAction)
  })

  it('should create an action to set rules', () => {
    const rules = {
      numOfDices: 3
    }
    const expectedAction = {
      type: types.SET_RULES,
      rules
    }
    expect(setRules(rules)).toEqual(expectedAction)
  })

})
