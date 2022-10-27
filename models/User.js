const { common } = require('../utils/index')
const mongoose = require('mongoose')
const { Schema } = mongoose

const User = new Schema(
  {
    name: String,
    role: {
      type: String,
      default: 'User',
      enum: ['User', 'Admin']
    },
    phone: String,
    email: {
      ...common.creteCommonSchema(String),
      unique: true,
      trim: true
    },
    password: common.creteCommonSchema(String)
  },
  { timestamps: true }
)

User.on('create_ticket_array', () => {
  User.add({
    booked_tickets: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Ticket'
      }
    ]
  })
})

module.exports = {
  User: mongoose.model('User', User),
  UserSchema: User
}
