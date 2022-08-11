const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Flight = require('./routers/flight')
const User = require('./routers/user')

const app = express()

mongoose.connect('mongodb://localhost:27017/flightBooking', {
  useNewUrlParser: true
})

//Get the default connection
const db = mongoose.connection

//Bind connection to error event (to get notification of connection errors)
db.on('error', () => console.error('MongoDB connection error:'))

app.use(bodyParser.json())

app.use('/flight', Flight)
app.use('/user', User)

/**
 * When page is not in the scope throw error
 */
app.use((req, res) => {
  res.status(404)
  //errorMessage(new errors.NotFound())
  res.send('PAGE UNKNOWN')
})

app.listen(3000, console.log('Server is listening...'))
