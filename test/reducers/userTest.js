import reducer from '../../src/reducers/user'
import {SET_NAME} from '../../src/actions/const'
import expect from 'expect'
import deepFreeze from 'deep-freeze'

describe('user', () => {

  it('should not change the passed state', () => {
    const state = Object.freeze({});
    expect(reducer(state, {type: 'INVALID'})).toBe(state);
  });

  it('should provide empty initial name', () => {
    expect(reducer(undefined, {})).toEqual({name: ''});
  });

  it('should set name', () => {
    const state = {};
    deepFreeze(state);
    expect(reducer(state, {
      type: SET_NAME,
      name: 'foo'
    })).toEqual(
      {
        name: 'foo'
      }
    );
  });

  it('should change existing name', () => {
    const state = {name: 'foo'};
    deepFreeze(state);
    expect(reducer(state, {
      type: SET_NAME,
      name: 'bar'
    })).toEqual(
      {
        name: 'bar'
      }
    );
  });

  it('should not change name to empty value', () => {
    const state = {name: 'foo'};
    deepFreeze(state);
    expect(reducer(state, {
      type: SET_NAME,
      name: ''
    })).toBe(state);
  });

  it('should keep same state if name property is not defined in action', () => {
    const state = { name: 'foo' };
    deepFreeze(state);
    expect(reducer(state, {
      type: SET_NAME
    })).toBe(state);
  });
});
