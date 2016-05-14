import express from 'express'
import http from 'http'
import Session from 'express-session'
import ios from 'socket.io-express-session'
import _ from 'lodash'

const app = express()
const server = http.Server(app)


const session = Session({
  name: 'dices',
  secret: 'keyboard cat',
  cookie: { maxAge: 60000 },
  resave: true,
  saveUninitialized: true
});

app.use(session);
const io = require('socket.io')(server);

io.use(ios(session));
server.listen(8000);

console.log('server is up');

app.use('/assets', express.static(__dirname + '/../dist/assets'));
app.use('/img', express.static(__dirname + '/../img'));

var users = [];
var game = {
  users: {},
  rules: {}
};

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log("Session id: " + socket.handshake.session.id);
  var sessionId = socket.handshake.session.id;
  if (_.has(game.users, sessionId)) {
    socket.emit('action', {type:'set_name', name: game.users[sessionId]});
  }


  socket.on('action', (action) => {
    console.log('Got data!', sessionId, action);
    switch (action.type) {
      case 'server/SET_NAME':
        game.users = game.users || {};
        if (!_.has(game.users, sessionId)) {
          game.users[sessionId] = action.name;
        }
        console.log(game.users);
       break;
      case 'server/SET_RULES':
        // check num of players
        game.rules = game.rules || {};
        game.rules.numOfDices = action.rules.numOfDices;
        io.sockets.emit('action', {type:'rules', rules: action.rules});
        break;
      case 'server/ROLL_DICES':
        console.log('should roll the dice');
        var rolledDices = Array.from(
          { length: game.rules.numOfDices },
          () => _.random(1, 6)
        );
        io.sockets.emit('action', {
          type:'roll_result',
          dices: rolledDices,
          user: sessionId
        });
        break;
      default:
        console.log('something else');
    }
  });
});


