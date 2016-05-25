import {USER_LEFT} from './const'

module.exports = (userId) => {
  return { type: USER_LEFT, userId}
}