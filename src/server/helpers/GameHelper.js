import _ from 'lodash'

/**
 * check if game is in progress - i.e. if gameEnds
 * is set to timestamp, which is in future - it means
 * game has already started but not finished yet
 *
 * @param store
 * @returns {boolean}
 */
export function gameInProgress(store) {
  const { game } = store.getState()
  const gameEnds = game.gameEnds
  if (gameEnds && Date.now() < gameEnds) {
    return true
  }
  return false
}

/**
 * game can be started only if it hasn't
 * started yet, and we have more than 1 player
 *
 * @param store
 * @returns {boolean}
 */
export function gameCanBeStarted(store) {
  const { users } = store.getState()
  if (!gameInProgress(store) && users.length > 1) {
    return true
  }
  return false
}

export function getCastDiceById(store, userId) {
  const { game } = store.getState()
  return _.find(game.castDice, (obj) => obj.user.id === userId)
}


export function getCastDice(store) {
  const { game } = store.getState()
  return game.castDice
}



export function canCastDice(store, userId = undefined) {
  if (gameInProgress(store) && undefined !== userId) {
    // check if user has already cast dice
    return (undefined === getCastDiceById(store, userId))
  } else {
    return gameCanBeStarted(store)
  }
}

/**
 * game should be ended if:
 *   it is in progress
 *   all active users have cast dice already
 *
 *   or if time is up
 *
 * @param store
 */
export function shouldEndTheGame(store) {
  const { users, game } = store.getState()
  if (!gameInProgress(store)) {
    return true
  } else {
    const activeUsers = _.map(users, (u) => u.id)
    const rolledUsers = _.map(game.castDice, (cd) => cd.user.id)
    return _.isEqual(activeUsers, _.intersection(activeUsers, rolledUsers))
  }
}

/**
 * check either we can change rules for game
 * @param store
 * @returns {boolean}
 */
export function canChangeRules(store) {
  const { users } = store.getState()
  if (1 === users.length && !gameInProgress(store)) {
    return true
  }
  return false
}

export function findUserById(store, userId) {
  if (store && userId) {
    const { users } = store.getState()
    return _.find(users, (u) => u.id === userId)
  }
  return undefined;
}

export function getActiveUserCount(store) {
  const { users } = store.getState()
  return users.length
}

export function getRules(store, userId = undefined) {
  const { game } = store.getState()
  return {
    ..._.pick(game, 'numOfDice'),
    canCastDice: canCastDice(store, userId),
    canChangeRules: canChangeRules(store)
  }
}

export function getLastWinner(store) {
  const { game } = store.getState()
  return game['lastWinner']
}
