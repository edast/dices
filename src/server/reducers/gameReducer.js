import * as actions from '../actions/const'
import _ from 'lodash'

const initialState = {
  numOfDice: 2,
  castDice: [],
  lastWinner: undefined,
  gameEnds: undefined
}

module.exports = function(state = initialState, action) {
  switch(action.type) {
    case actions.SET_RULES: {
      let nextState = state
      if (action && action.rules && action.rules.numOfDice) {
        if (_.inRange(action.rules.numOfDice, 1, 5)) {
          nextState = { ...state, numOfDice: action.rules.numOfDice }
        }
      }
      return nextState
    }

    case actions.THROW_DICE: {
      let nextState = state
      if (undefined === _.find(state.castDice, {user: {id: action.user.id}})) {
        const rolledDice = {
          user: action.user,
          dice: Array.from({length: state.numOfDice}, () => _.random(1, 6))
        }
        let castDice = _.concat(state.castDice, rolledDice)
        nextState = { ...state, castDice }
      }
      return nextState
    }

    case actions.START_GAME: {
      let nextState = state
      nextState = { ...state, gameEnds: Date.now() + action.duration }
      return nextState
    }

    case actions.END_GAME: {
      let nextState = state
      let castDice = _.orderBy(
        state.castDice,
        (cd) => {
          return _.reduce(cd.dice, (sum, n) => sum + n)
        },
        'desc'
      )
      // if it's a draw - first to throw the dice wins
      nextState = { ...state,
        castDice: [],
        lastWinner: castDice[0],
        gameEnds: Date.now() - 1
      }
      return nextState
    }

    default: {
      return state
    }
  }
}
