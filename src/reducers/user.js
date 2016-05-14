import {SET_NAME} from '../actions/const';
import _ from 'lodash'

/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
  name: ''
};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  //let nextState = Object.assign({}, state);
  switch(action.type) {
    case 'set_name':
    case SET_NAME: {
      let nextState = state;
      if (action && !_.isEmpty(_.trim(action.name))) {
        nextState = { ...state, name: action.name }
      }
      return nextState;
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
