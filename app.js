const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const initializePassport = require('./passport-config')
const flash = require('express-flash')

const Flight = require('./routers/flight')
const User = require('./routers/user')
const Auth = require('./routers/auth')
const message = require('./utils/message')
const errors = require('./utils/errors')

const app = express()

initializePassport(passport)

mongoose.connect('mongodb://localhost:27017/flightBooking', {
  useNewUrlParser: true
})

//Get the default connection
const db = mongoose.connection

//Bind connection to error event (to get notification of connection errors)
db.on('error', () => console.error('MongoDB connection error:'))

app.use(bodyParser.json())
app.use(flash())

app.use(
  session({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: false
  })
)
app.use(passport.initialize())
app.use(passport.session())

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }

  res.json({ message: 'Need to log in' })
}

app.use('/flight', checkAuthenticated, Flight)
app.use('/user', checkAuthenticated, User)
app.use('', Auth)

/**
 * When page is not in the scope throw error
 */
app.use((req, res) => {
  res.status(404)

  res.send(message.error(new errors.NotFoundError()))
})

app.on('error', (error) => {
  console.log(error)
})
app.listen(3000, console.log('Server is listening...'))
