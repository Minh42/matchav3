const path = require('path')
const express = require('express')
const routes = require('./routes/routes.js')
const cors = require('cors')
const bodyParser = require('body-parser')
const session = require('express-session')
const mustacheExpress = require('mustache-express')
const helmet = require('helmet')
// const csrf = require('csurf')
const pool = require('./server/db')

const passport = require('passport')
const cookieSession = require('cookie-session')
const keys = require('./server/config/keys')

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  pingInterval: 1000,
  pingTimeout: 5000,
}) 

const PORT = process.env.PORT || 8080;

app.set('views', path.join(__dirname, 'views'))
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

const middlewares = [
  cors(),
  helmet(),
  // csrf({ cookie: true }),
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  }),
  passport.initialize(),
  passport.session()
]

app.use(middlewares)
app.use('/public', express.static(__dirname + '/public'))

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/', routes)

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

server.listen(PORT, () => {
  console.log('App running at http://localhost:8080')
})

var users = [];
var messages = [];
io.sockets.on('connection', function (socket) {

  socket.on('joinRequested', function(user_id) {
    users.push({
      userID: user_id,
      socketID: socket.id
    });

    let len = users.length;
    len--;
    io.emit('userJoined', {users: users, socketID: users[len].socketID})
  })

  socket.on('sendNotification', function(data) {
    socket.broadcast.to(data.notifier_id).emit('showNotification', {
      message: data.message
    })
  })

  socket.on('requestMessages', function(data) {
    data.forEach(async element => {
      console.log(element.conversation_id)
      var res = await pool.query('SELECT firstname, lastname, imageProfile_path, participant_id, message FROM `message` INNER JOIN `users` ON users.user_id = message.participant_id WHERE message.conversation_id = ?', [element.conversation_id]);
      console.log('im here MOTHERFUCKER');
      console.log(res);
      console.log('im here motherfucker');
      // messages.push({
      //   conversation_id: element.conversation_id,
      //   messages: res
      // })
    });
    // console.log(messages);
    // io.emit('sendMessages', {messages: messages})
  })
    
  // socket.on('subscribe', function(room) {
  //   console.log('joining room', room)
  //   socket.join(room)
  // })

  // socket.on('unsubscribe', function(room) {
  //   console.log('leaving room', room)
  //   socket.join(room)
  // })

  // socket.on('send', function (data) {
  //   console.log('info', data.id)
  //   console.log('room', data.room)
  //   console.log('message', data.message)
  //   io.sockets.in(data.room).emit('message', data)
  // });

  socket.on('disconnect', function() {
    for(let i = 0; i < users.length; i++) {
      if(users[i].socketID === socket.id) {
        users.splice(i,1);
      }
    }
    io.emit('userLeft', {users: users});
  })
});