import * as actions from '../actions/const'
import _ from 'lodash'

const initialState = []

module.exports = function(state = initialState, action) {
  switch(action.type) {
    case actions.USER_JOINED: {
      let nextState = [...state, action.user]
      return nextState
    }

    case actions.USER_LEFT: {
      let nextState = _.filter(state, (u) => u.id !== action.userId)
      return nextState
    }

    default: {
      return state
    }
  }
}
