const mongoose = require('mongoose')
const { Schema } = mongoose
const { creteCommonSchema } = require('../utils/common')

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
      ...creteCommonSchema(String),
      unique: true,
      trim: true
    },
    password: creteCommonSchema(String),
    booked_tickets: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Ticket'
      }
    ]
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', User)
