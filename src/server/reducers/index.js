import { combineReducers } from 'redux'
import gameReducer from './gameReducer'
import usersReducer from './usersReducer'

export default combineReducers({
  game: gameReducer,
  users: usersReducer
})