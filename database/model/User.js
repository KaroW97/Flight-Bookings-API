const mongoose = require('mongoose')
const { Schema } = mongoose
const { Ticket } = require('./Ticket')
const { creteCommonSchema } = require('../../common')

const User = new Schema({
  role: {
    type: String,
    default: 'User',
    enum: ['User', 'Admin']
  },
  phone: creteCommonSchema(String),
  email_address: {
    ...creteCommonSchema(String),
    unique: true
  },
  password: creteCommonSchema(String),
  account_creation_date: creteCommonSchema(Date),
  account_update_date: Date,
  booked_tickets: [{ type: Schema.Types.ObjectId, ref: 'Ticket' }]
})

module.exports = mongoose.model('User', User)
