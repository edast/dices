import * as actions from '../actions/const';
import _ from 'lodash';

const initialState = {
  numOfDice: 2,
  rolledDice: []
};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  //let nextState = Object.assign({}, state);

  switch(action.type) {
    case 'rules':
    case actions.SET_RULES: {
      let nextState = state
      if (action.rules && action.rules['numOfDice']) {
        nextState = _.assign(
          {}, state, _.pick(action.rules, ['canChangeRules', 'canCastDice', 'numOfDice'])
        )
      }
      return nextState
    }

    case actions.ROLL_THE_DICE: {
      // here we should post to our server
      let nextState = state
      const rolledDice = Array.from(
        { length: state.numOfDice },
        () => _.random(1, 6)
      )
      nextState = { ...state, rolledDice }
      return nextState
    }

    case actions.DICE_WAS_CAST: {
      let nextState = state
      let castDice = action.castDice
      nextState = { ...state, castDice }
      return nextState
    }

    case actions.END_GAME: {
      let nextState = state
      let castDice = state.castDice.map((cd) => {
        if (action.winner.user.id === cd.user.id) {
          return {...cd, winner: true}
        } else {
          return {...cd, looser: true}
        }
      })
      nextState = { ...state, castDice, lastWinner: action.winner }
      return nextState
    }

    default: {
      /* Return original state if no actions were consumed. */
      return state
    }
  }
}
