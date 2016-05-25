import express from 'express'
import http from 'http'
import Session from 'express-session'
import ios from 'socket.io-express-session'
import * as actions from './actions/const'
import * as gameHelper from './server/helpers/GameHelper'
import { applyMiddleware, createStore } from 'redux'
import reducer from './server/reducers/index'
import createLogger from 'redux-node-logger'
import userJoined from './server/actions/userJoined'
import userLeft from './server/actions/userLeft'
import * as gameActions from './server/actions/gameActions'
import commander from 'commander'

commander
  .option('--port <value>', 'port', 3000)
  .option('-v, --verbose', 'print state change to console', false)
  .parse(process.argv)


// how long each round takes (in ms)
const GAME_LENGTH = 10000
const app = express()
const server = http.Server(app)
let mw = undefined
if (commander.verbose) {
  mw = applyMiddleware(createLogger())
}
const store = createStore(reducer, mw)

const session = Session({
  name: 'dices',
  secret: 'gambler cat',
  cookie: { maxAge: 60000 },
  resave: true,
  saveUninitialized: true
});

let timer = undefined

app.use(session);
const io = require('socket.io')(server);

io.use(ios(session));
server.listen(commander.port);

console.log('connect to server http://localhost:' + commander.port)

app.use('/assets', express.static(__dirname + '/../dist/assets'))
app.use('/img', express.static(__dirname + '/../img'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
});

io.on('connection', function (socket) {
  if (commander.verbose) {
    console.log('Session id: ' + socket.handshake.session.id)
  }
  let sessionId = socket.handshake.session.id
  let user = gameHelper.findUserById(sessionId)
  if (undefined !== user) {
    socket.emit('action', {type: actions.SET_NAME, name: user.name})
  }

  socket.on('disconnect', function() {
    sessionId = socket.handshake.session.id
    console.log('Got disconnect!');
    store.dispatch(userLeft(sessionId))
    if (!gameHelper.gameInProgress(store)) {
      io.sockets.emit('action', {type: 'rules', rules: gameHelper.getRules(store)})
    }
  })

  // this is where the action happens
  socket.on('action', (action) => {
    sessionId = socket.handshake.session.id
    switch (action.type) {
      // user sets his name
      case actions.SET_NAME:
        store.dispatch(userJoined({
          id: sessionId,
          name: action.name
        }))

        if (gameHelper.gameInProgress(store)) {
          socket.emit('action', {
            type: actions.DICE_WAS_CAST,
            castDice: gameHelper.getCastDice(store)
          })
          socket.emit('action', {type: 'rules', rules: gameHelper.getRules(store, sessionId)})
        } else {
            io.sockets.emit('action', {type: 'rules', rules: gameHelper.getRules(store)})
        }
       break;

      // first player can set rules
      case actions.SET_RULES:
        // check num of players
        // if (1 === gameHelper.getActiveUserCount(store)) {
        if (gameHelper.canChangeRules(store)) {
          // TODO: check if game is not active
          store.dispatch(gameActions.setRules(action.rules))
          let rules = gameHelper.getRules(store)
          io.sockets.emit('action', {type: 'rules', rules });
        } else {
          socket.emit('error', {msg: 'not allowed to do this'})
        }
        break;

      // let's play!
      case actions.ROLL_THE_DICE:
        if (!gameHelper.gameInProgress(store) && !gameHelper.gameCanBeStarted(store)) {
          break
        }
        let userDice = gameHelper.getCastDiceById(store, sessionId)
        if (undefined === userDice) {
          if (!gameHelper.gameInProgress(store)) {
            store.dispatch(gameActions.startGame(GAME_LENGTH))
            timer = setTimeout(function(){
              store.dispatch(gameActions.endGame())
              console.log('TIME IS UP!!! winner:', gameHelper.getLastWinner(store))
              io.sockets.emit('action', {
                type: 'END_GAME',
                winner: gameHelper.getLastWinner(store)
              })
              io.sockets.emit('action', {type: 'rules', rules: gameHelper.getRules(store)})
            }, 5000)
          }
          user = gameHelper.findUserById(store, sessionId)
          store.dispatch(gameActions.throwDice(user))
          io.sockets.emit('action', {
            type: actions.DICE_WAS_CAST,
            castDice: gameHelper.getCastDice(store)
          })

          if (gameHelper.shouldEndTheGame(store)) {
            clearTimeout(timer)
            store.dispatch(gameActions.endGame())
            console.log('winner:', gameHelper.getLastWinner(store))
            io.sockets.emit('action', {
              type: 'END_GAME',
              winner: gameHelper.getLastWinner(store)
            })
            io.sockets.emit('action', {type: 'rules', rules: gameHelper.getRules(store)})
          } else {
            socket.emit('action', {type: 'rules', rules: gameHelper.getRules(store, sessionId)})
          }
        } else {
          io.emit('error', {msg : 'you have already rolled'})
        }
        break;


      default:
        console.log('this should not happen :)');
    }
  })
})


