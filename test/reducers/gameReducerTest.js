import reducer from '../../src/server/reducers/gameReducer'
import * as actions from '../../src/actions/const'
import { setRules, throwDice } from '../../src/server/actions/gameActions'
import expect from 'expect'
import deepFreeze from 'deep-freeze'


describe('gameReducer', () => {
  it('should not change the passed state', () => {
    const state = Object.freeze({});
    expect(reducer(state, {type: 'INVALID'})).toBe(state);
  });

  it('should provide initial state', () => {
    expect(reducer(undefined, {type: 'INVALID'})).toEqual({
      castDice: [],
      gameEnds: undefined,
      lastWinner: undefined,
      numOfDice: 2
    })
  })

  it('should let set number of dices to 1..4', () => {
    const state = { numOfDice: 2 };
    deepFreeze(state);
    for (let i of _.range(1,5)) {
      expect(reducer(state, setRules({numOfDice: i}))).toEqual(
        {numOfDice: i}
      );
    }
  });

  it('Should return same state if rules are not defined', () => {
    const state = { numOfDice: 2 };
    deepFreeze(state);
    expect(reducer(state, setRules())).toBe(state);
    expect(reducer(state, setRules({numOfDice: undefined}))).toBe(state);
  });

  it('Should not allow to set number of dices < 1', () => {
    const state = { numOfDice: 2 };
    deepFreeze(state);
    expect(reducer(state, setRules({numOfDice: 0}))).toBe(state);
    expect(reducer(state, setRules({numOfDice: -2}))).toBe(state);
  });

  it('Should not allow to set number of dices > 4', () => {
    const state = { numOfDice: 2 };
    deepFreeze(state);
    expect(reducer(state, setRules({numOfDice: 5}))).toBe(state);
    expect(reducer(state, setRules({numOfDice: 100}))).toBe(state);
  });

  it('should roll dice for user', () => {
    const user = {
      id: '2a99089558234911ebef78e01cc694c4',
      name: 'james'
    }
    const state = { numOfDice: 4, castDice: [] }
    deepFreeze(state)
    const newState = reducer(state, throwDice(user))
    expect(newState.castDice.length).toBe(1)
    expect(newState.castDice[0].user).toEqual(user)
    expect(newState.castDice[0].dice.length).toBe(state.numOfDice)
  })

  it('should roll dice and return values in range 1..6', () => {
    const user = {
      id: '2a99089558234911ebef78e01cc694c4',
      name: 'james'
    }
    const state = { numOfDice: 4, castDice: [] }
    deepFreeze(state)
    const newState = reducer(state, throwDice(user))
    newState.castDice[0].dice.forEach((val) => {
      expect(val)
        .toBeLessThanOrEqualTo(6, 'dice value should be <= 6')
        .toBeGreaterThanOrEqualTo(1, 'dice value should be >= 1');
    })
  })

  it('should return same state if user has already rolled', () => {
    const user = {
      id: '2a99089558234911ebef78e01cc694c4',
      name: 'james'
    }
    const state = { numOfDice: 1, castDice: [{dice: [1], user}] }
    deepFreeze(state)
    expect(reducer(state, throwDice(user))).toBe(state)
  })
})
