const { creteCommonSchema } = require('../../common')
const mongoose = require('mongoose')
const { Schema } = mongoose

const Ticket = new Schema({
  flight: { type: Schema.Types.ObjectId, ref: 'Flight' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  rank: {
    ...creteCommonSchema(String),
    enum: ['Economy', 'Business', 'Deluxe']
  },
  price: creteCommonSchema(Number),
  date_of_creation: creteCommonSchema(Date)
})

module.exports = mongoose.model('Ticket', Ticket)
