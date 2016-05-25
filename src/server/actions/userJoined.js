import {USER_JOINED} from './const'

module.exports = (user) => {
  return { type: USER_JOINED, user}
}