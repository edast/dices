var reducer = require('../../src/reducers/game');
import {SET_RULES} from '../../src/actions/const'
import setRules from '../../src/actions/setRules'
import rollDices from '../../src/actions/rollDices'
import expect from 'expect'
import deepFreeze from 'deep-freeze'
import _ from 'lodash'


describe('game', () => {

  it('should not change the passed state', () => {
    const state = Object.freeze({});
    reducer(state, {type: 'INVALID'});
  });

  it('should provide initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      numOfDices: 2,
      rolledDices: []
    });
  });

  it('should let set number of dices to 1..4', () => {
    const state = { numOfDices: 2 };
    deepFreeze(state);
    for (let i of _.range(1,5)) {
      expect(reducer(state, setRules({numOfDices: i}))).toEqual(
        {numOfDices: i}
      );
    }

  });

  it('Should return same state if rules are not defined', () => {
    const state = { numOfDices: 2 };
    deepFreeze(state);
    expect(reducer(state, setRules())).toBe(state);
    expect(reducer(state, setRules({numOfDices: undefined}))).toBe(state);
  });

  it('Should not allow to set number of dices < 1', () => {
    const state = { numOfDices: 2 };
    deepFreeze(state);
    expect(reducer(state, setRules({numOfDices: 0}))).toBe(state);
    expect(reducer(state, setRules({numOfDices: -2}))).toBe(state);
  });

  it('Should not allow to set number of dices > 4', () => {
    const state = { numOfDices: 2 };
    deepFreeze(state);
    expect(reducer(state, setRules({numOfDices: 5}))).toBe(state);
    expect(reducer(state, setRules({numOfDices: 100}))).toBe(state);
  });

  it('Should roll number of dices defined in state.numOfDices', () => {
    const state = { numOfDices: 2, rolledDices: [] }
    deepFreeze(state);
    expect(reducer(state, rollDices()).rolledDices.length).toEqual(state.numOfDices);
  });

  it('Should roll dices and return values in range 1..6', () => {
    const state = { numOfDices: 4, rolledDices: [] }
    deepFreeze(state);
    reducer(state, rollDices()).rolledDices.forEach((val) => {
      expect(val)
        .toBeLessThanOrEqualTo(6, 'dice value should be <= 6')
        .toBeGreaterThanOrEqualTo(1, 'dice value should be >= 1');
    });
  });
});
