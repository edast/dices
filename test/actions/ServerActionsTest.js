import expect from 'expect'
import userJoined from '../../src/server/actions/userJoined'
import userLeft from '../../src/server/actions/userLeft'

import {setRules, startGame, endGame, throwDice} from '../../src/server/actions/gameActions'

import * as types from '../../src/server/actions/const'

describe('server actions', () => {
  it('should create an action "user joined"', () => {
    const user = {
      id: '2a99089558234911ebef78e01cc694c4',
      name: 'james'
    }
    const expectedAction = {
      type: types.USER_JOINED,
      user
    }
    expect(userJoined(user)).toEqual(expectedAction)
  })

  it ('should create action "user left"', () => {
    const userId = '2a99089558234911ebef78e01cc694c4'
    const expectedAction = {
      type: types.USER_LEFT,
      userId
    }
    expect(userLeft(userId)).toEqual(expectedAction)
  })

  it('should create action set rules', () => {
    const rules = {
      numOfDice: 3
    }
    const expectedAction = {
      type: types.SET_RULES,
      rules
    }
    expect(setRules(rules)).toEqual(expectedAction)
  })

  it('should create action startGame', () => {
    const duration = 5000
    const expectedAction = {
      type: types.START_GAME,
      duration
    }
    expect(startGame(duration)).toEqual(expectedAction)
  })

  it('should create action endGame', () => {
    const expectedAction = {
      type: types.END_GAME
    }
    expect(endGame()).toEqual(expectedAction)
  })

  it('should create action throw dice', () => {
    const user = {
      id: '2a99089558234911ebef78e01cc694c4',
      name: 'james'
    }
    const expectedAction = {
      type: types.THROW_DICE,
      user
    }
    expect(throwDice(user)).toEqual(expectedAction)
  })
})
