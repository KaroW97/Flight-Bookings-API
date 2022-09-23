const cache = require('memory-cache')
const { common } = require('../../utils/index')

const Chance = require('chance')
const chance = new Chance()

const generateTickets = () => {
  const currency = chance.currency()
  return {
    Economy: {
      ticketType: 'Economy',
      price: chance.integer({ min: 1, max: 99 }),
      amount: chance.integer({ min: 0, max: 100 }),
      currency
    },
    Business: {
      ticketType: 'Business',
      price: chance.integer({ min: 100, max: 199 }),
      amount: chance.integer({ min: 0, max: 10 }),
      currency
    },
    Deluxe: {
      ticketType: 'Deluxe',
      price: chance.integer({ min: 200, max: 500 }),
      amount: chance.integer({ min: 0, max: 20 }),
      currency
    }
  }
}

const createBody = (req, res, next) => {
  const { body } = req

  const {
    start_date_time,
    end_date_time,
    departure_point,
    destination_point,
    ticket_prices,
    total_ticket_number,
    number_of_available_tickets,
    date_of_creation
  } = body || {}

  const tickets = generateTickets()

  const actionType = cache.get('UPDATE_FLIGHT')

  req.body = {
    start_date_time: common.setMinimalTime(0, start_date_time),
    end_date_time: common.setMinimalTime(75, end_date_time),
    departure_point: departure_point ?? chance.city(),
    destination_point: destination_point ?? chance.city(),
    ticket_prices: ticket_prices ?? tickets,
    total_ticket_number:
      actionType === 'UPDATE_FLIGHT'
        ? total_ticket_number
        : common.countTicketAmount(tickets),
    number_of_available_tickets:
      actionType === 'UPDATE_FLIGHT'
        ? number_of_available_tickets
        : common.countTicketAmount(tickets),
    date_of_creation: common.setMinimalTime(0, date_of_creation)
  }

  next()
}

module.exports = {
  createBody
}
