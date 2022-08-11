const mongoose = require('mongoose')
const { Schema } = mongoose
const { creteCommonSchema } = require('../../common')
const Chance = require('chance')
const chance = new Chance()

const currency = chance.currency()
const ticketTypes = {
  Economy: {
    ticketType: 'Economy',
    price: chance.integer({ min: 1, max: 99 }),
    currency
  },
  Business: {
    ticketType: 'Business',
    price: chance.integer({ min: 100, max: 199 }),
    currency
  },
  Deluxe: {
    ticketType: 'Deluxe',
    price: chance.integer({ min: 200, max: 500 }),
    currency
  }
}

const setMinimalTime = (time = 60) => {
  const date = new Date()

  date.setMinutes(date.getMinutes() + Math.abs(date.getTimezoneOffset()) + time)

  return date
}

const Flight = new Schema({
  start_date_time: {
    ...creteCommonSchema(Date),
    // min: setMinimalTime()
  },
  end_date_time: {
    ...creteCommonSchema(Date),
    //min: setMinimalTime(75)
  },
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
    required: true,
    default: ticketTypes
  },
  total_ticket_number: creteCommonSchema(Number),
  number_of_available_tickets: creteCommonSchema(Number),
  date_of_creation: {
    type: Date,
    default: setMinimalTime(0)
  }
})

module.exports = mongoose.model('Flight', Flight)
