const path = require('path')
const express = require('express')
const routes = require('./routes/routes.js')
const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')
const session = require('express-session')
// const flash = require('express-flash');
const mustacheExpress = require('mustache-express')
const helmet = require('helmet')
// const csrf = require('csurf')

const passport = require('passport')
const cookieSession = require('cookie-session')
const keys = require('./server/config')

const app = express()
const PORT = process.env.PORT || 8080;

//COOKIE + PASSPORT INITIALIZE
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookiekey]
})
);
app.use(passport.initialize());
app.use(passport.session());

app.set('views', path.join(__dirname, 'views'))
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

const middlewares = [
  helmet(),
  // csrf({ cookie: true }),
  express.static(path.join(__dirname, 'assets')),
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
  // cookieParser(),
  session({
    secret: 'abcdef',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }),
  require('./src/middlewares/flash')
]

app.use(middlewares)
app.use('/', routes)

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(PORT, () => {
    console.log('App running at http://localhost:8080')
})
