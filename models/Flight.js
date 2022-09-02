const mongoose = require('mongoose')
const { Schema } = mongoose
const { creteCommonSchema, setMinimalTime } = require('../utils/common')
const Chance = require('chance')
const chance = new Chance()

const Flight = new Schema(
  {
    start_date_time: creteCommonSchema(Date),
    end_date_time: creteCommonSchema(Date),
    departure_point: {
      ...creteCommonSchema(String),
      default: chance.city()
    },
    destination_point: {
      ...creteCommonSchema(String),
      default: chance.city()
    },
    ticket_prices: {
      type: Object,
      required: true
    },
    total_ticket_number: creteCommonSchema(Number),
    number_of_available_tickets: creteCommonSchema(Number)
  },
  { timestamps: true }
)

module.exports = mongoose.model('Flight', Flight)
