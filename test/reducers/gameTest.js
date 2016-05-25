var reducer = require('../../src/reducers/game');
import * as actions from '../../src/actions/const'
import setRules from '../../src/actions/setRules'
import rollTheDice from '../../src/actions/rollTheDice'
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
      numOfDice: 2,
      rolledDice: []
    });
  });

});
