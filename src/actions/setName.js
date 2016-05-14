import {SET_NAME} from './const';

module.exports = function(name) {
  return { type: SET_NAME, name };
};
