const { common } = require('../utils/index')
const mongoose = require('mongoose')
const Chance = require('chance')

const { Schema } = mongoose
const chance = new Chance()

const Flight = new Schema(
  {
    start_date_time: common.creteCommonSchema(Date),
    end_date_time: common.creteCommonSchema(Date),
    departure_point: {
      ...common.creteCommonSchema(String),
      default: chance.city()
    },
    destination_point: {
      ...common.creteCommonSchema(String),
      default: chance.city()
    },
    ticket_prices: {
      type: Object,
      required: true
    },
    total_ticket_number: common.creteCommonSchema(Number),
    number_of_available_tickets: common.creteCommonSchema(Number)
  },
  { timestamps: true }
)

module.exports = mongoose.model('Flight', Flight)
