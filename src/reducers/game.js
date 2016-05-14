import {SET_RULES} from '../actions/const';
import {ROLL_DICES} from '../actions/const';
import _ from 'lodash';

const initialState = {
  numOfDices: 2,
  rolledDices: []
};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  //let nextState = Object.assign({}, state);

  switch(action.type) {
    case 'rules':
    case SET_RULES: {
      let nextState = state;
      if (action && action.rules && action.rules.numOfDices) {
        if (_.inRange(action.rules.numOfDices, 1, 5)) {
          nextState = { ...state, numOfDices: action.rules.numOfDices }
        }
      }
      return nextState;
    } break;

    case ROLL_DICES: {
      // here we should post to our server
      let nextState = state;
      const rolledDices = Array.from(
        { length: state.numOfDices },
        () => _.random(1, 6)
      );
      nextState = { ...state, rolledDices }
      return nextState;
    } break;
    /*
    case 'YOUR_ACTION': {
      // Modify next state depending on the action and return it
      return nextState;
    } break;
    */
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
