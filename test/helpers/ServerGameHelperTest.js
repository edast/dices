import expect from 'expect'
import * as gameHelper from '../../src/server/helpers/GameHelper'
import gameReducer from '../../src/server/reducers/gameReducer'
import usersReducer from '../../src/server/reducers/usersReducer'

class StoreMock {
  constructor(users = [], game = {}) {
    this.users = usersReducer(users, { type: 'INVALID'})
    this.game = gameReducer(game, { type: 'INVALID'})
  }
  getState() {
    return {
      users: this.users,
      game: this.game
    }
  }
}

describe('server/gameHelpers', () => {
  const user = {
    id: '2a99089558234911ebef78e01cc694c4',
    name: 'james'
  }
  it('should find object in store by id', () => {
    const store = new StoreMock([user])
    expect(gameHelper.findUserById(store, user.id)).toEqual(user)
    // return undefined if there is no such user
    expect(gameHelper.findUserById(store, 'foo')).toBe(undefined)
  })

  it('should return number of active players', () => {
    const store = new StoreMock([{id:'foo'}, {id: 'bar'} , {id: 'baz'}])
    expect(gameHelper.getActiveUserCount(store)).toEqual(3)
  })

  it('should return cast dice by user id', () => {
    const userCastDice = {castDice: [{user, dice: [1]}]}
    const store = new StoreMock([], userCastDice)
    expect(gameHelper.getCastDiceById(store, user.id)).toEqual({
      user,
      dice: [1]
    })
  })

  it('should return rules with decorations', () => {
    const rules = { numOfDice: 1 }
    const store = new StoreMock([], rules )
    expect(gameHelper.getRules(store)).toEqual(
      {...rules, canChangeRules: false, canCastDice: false}
    )
  })

  describe('gameInProgress', () => {
    it('should return false when game is not in progress', () => {
      const store = new StoreMock()
      let actual = gameHelper.gameInProgress(store)
      expect(actual).toBe(false)
    })

    it('should return true when game is in progress', () => {
      const gameEnds =  Date.now() + 1000
      const store = new StoreMock([], { gameEnds })
      let actual = gameHelper.gameInProgress(store)
      expect(actual).toBe(true)
    })

    it('should return false if game has already finished', () => {
      const gameEnds =  Date.now() - 1000
      const store = new StoreMock([], { gameEnds })
      let actual = gameHelper.gameInProgress(store)
      expect(actual).toBe(false)
    })
  })

  describe('gameCanBeStarted', () =>{
    it('should return false if game has already started', () => {
      const gameEnds =  Date.now() + 1000
      const users = [{id:'foo'}, {id: 'bar'} , {id: 'baz'}]
      const store = new StoreMock(users, { gameEnds })
      let actual = gameHelper.gameCanBeStarted(store)
      expect(actual).toBe(false)
    })

    it("should return false if there's not enough users", () => {
      const gameEnds =  Date.now() - 1000
      const users = [{id:'foo'}]
      const store = new StoreMock(users, { gameEnds })
      let actual = gameHelper.gameCanBeStarted(store)
      expect(actual).toBe(false)
    })

    it("should return true if there's enough users", () => {
      const gameEnds =  Date.now() - 1000
      const users = [{id:'foo'}, {id: 'bar'}]
      const store = new StoreMock(users, { gameEnds })
      let actual = gameHelper.gameCanBeStarted(store)
      expect(actual).toBe(true)
    })
  })

  describe('shouldEndTheGame', () => {
    it('should return true if all active users have already cast dice', () => {
      const users = [{id:'foo'}, {id: 'bar'}]
      const rules =  {
        gameEnds: Date.now() + 1000,
        castDice: [
          {dice: [1], user: users[0]},
          {dice: [2], user: users[1]}
        ]
      }
      const store = new StoreMock(users, rules)
      expect(gameHelper.shouldEndTheGame(store)).toBe(true)
    })

    it('should return true if all active users have already cast dice', () => {
      const users = [{id:'foo'}, {id: 'bar'}]
      // some users have already disconnected, but thats ok
      const rules =  {
        gameEnds: Date.now() + 1000,
        castDice: [
          {dice: [1], user: users[0]},
          {dice: [2], user: users[1]},
          {dice: [3], user: {id: 'baz'}}
        ]
      }
      const store = new StoreMock(users, rules)
      expect(gameHelper.shouldEndTheGame(store)).toBe(true)
    })

    it('should return false if not all active users have cast dice', () => {
      const users = [{id:'foo'}, {id: 'bar'}]
      // some users have already disconnected, but thats ok
      const rules =  {
        gameEnds: Date.now() + 1000,
        castDice: [
          {dice: [1], user: users[0]},
          {dice: [3], user: {id: 'baz'}}
        ]
      }
      const store = new StoreMock(users, rules)
      expect(gameHelper.shouldEndTheGame(store)).toBe(false)
    })


    it('should return true if time is up', () => {
      const users = [{id:'foo'}, {id: 'bar'}]
      const rules =  {
        gameEnds: Date.now() - 1,
        castDice: [{dice: [1], user: users[0]}]
      }
      const store = new StoreMock(users, rules)
      expect(gameHelper.shouldEndTheGame(store)).toBe(true)
    })
  })

  describe('canChangeRules', () => {
    it('should return false if there is more than one user', () => {
      const users = [{id:'foo'}, {id: 'bar'}]
      const rules =  {
        gameEnds: Date.now() - 1
      }
      const store = new StoreMock(users, rules)
      expect(gameHelper.canChangeRules(store)).toBe(false)
    })

    it('should return false if game is in progress', () => {
      const users = [{id:'foo'}]
      const rules =  {
        gameEnds: Date.now() + 100
      }
      const store = new StoreMock(users, rules)
      expect(gameHelper.canChangeRules(store)).toBe(false)
    })

    it('should return true if only one user and game is NOT in progress', () => {
      const users = [{id:'foo'}]
      const rules =  {
        gameEnds: Date.now() - 1
      }
      const store = new StoreMock(users, rules)
      expect(gameHelper.canChangeRules(store)).toBe(true)
    })
  })
})
