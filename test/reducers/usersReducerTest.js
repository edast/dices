import reducer from '../../src/server/reducers/usersReducer'
import * as actions from '../../src/actions/const'
import userJoined from '../../src/server/actions/userJoined'
import userLeft from '../../src/server/actions/userLeft'
import expect from 'expect'
import deepFreeze from 'deep-freeze'

describe('usersReducer', () => {
  it('should not change the passed state', () => {
    const state = Object.freeze({});
    expect(reducer(state, {type: 'INVALID'})).toBe(state);
  });

  it('should provide initial state', () => {
    expect(reducer(undefined, {type: 'INVALID'})).toEqual([])
  })

  it('should add new user to store on user_join action', () => {
    const user = {
      id: '2a99089558234911ebef78e01cc694c4',
      name: 'james'
    }
    const state = []
    deepFreeze(state)
    expect(reducer(state, userJoined(user))).toContain(user)
  })

  it('should remove user on user_left action', () => {
    const user = {
      id: '2a99089558234911ebef78e01cc694c4',
      name: 'james'
    }
    const state = [user]
    deepFreeze(state)
    expect(reducer(state, userLeft(user.id))).toNotContain(user)  })


});