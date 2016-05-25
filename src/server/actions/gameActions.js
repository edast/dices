import * as type from './const'

function endGame() {
  return { type: type.END_GAME }
}

function startGame(duration) {
  return { type: type.START_GAME, duration }
}

function throwDice(user) {
  return { type: type.THROW_DICE, user}
}

function setRules(rules) {
  return { type: type.SET_RULES, rules}
}

module.exports = {
  endGame,
  startGame,
  throwDice,
  setRules
}
