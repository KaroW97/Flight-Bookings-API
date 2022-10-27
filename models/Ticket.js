const { common } = require('../utils/index')
const mongoose = require('mongoose')
const { Schema } = mongoose

const Ticket = new Schema(
  {
    flight: { type: Schema.Types.ObjectId, ref: 'Flight' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    rank: {
      ...common.creteCommonSchema(String),
      enum: ['Economy', 'Business', 'Deluxe']
    },
    price: common.creteCommonSchema(Number)
  },
  { timestamps: true }
)

module.exports = mongoose.model('Ticket', Ticket)
