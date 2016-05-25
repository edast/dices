import {DICE_WAS_CAST} from './const';

module.exports = function(parameter) {
  return { type: DICE_WAS_CAST, parameter };
};
