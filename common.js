const Chance = require('chance')
const chance = new Chance()

const deleteUndefined = (data) => JSON.parse(JSON.stringify(data))

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

const creteCommonSchema = (type) => ({
  type,
  required: true
})

const setMinimalTime = (time = 0, data = undefined) => {
  if (data) return new Date(data)

  const date = new Date()

  date.setMinutes(date.getMinutes() + Math.abs(date.getTimezoneOffset()) + time)

  return date
}

const countTicketAmount = (ticket_prices) =>
  Object.values(ticket_prices).reduce((prev, { amount }) => prev + amount, 0)

//TODO: Add statement that  total_ticket_number and  number_of_available_tickets can be chaneged onlu when action type is UPDATE
// Add that ticket tprices needs to be updated to update total ticket numeber  and number_of_available_tickets
const createBody = (body) => {
  const {
    action_type,
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
  return {
    action_type: action_type,
    start_date_time: setMinimalTime(0, start_date_time),
    end_date_time: setMinimalTime(75, end_date_time),
    departure_point: departure_point ?? chance.city(),
    destination_point: destination_point ?? chance.city(),
    ticket_prices: ticket_prices ?? tickets,
    total_ticket_number:
      action_type === 'UPDATE'
        ? total_ticket_number
        : countTicketAmount(tickets),
    number_of_available_tickets:
      action_type === 'UPDATE'
        ? number_of_available_tickets
        : countTicketAmount(tickets),
    date_of_creation: setMinimalTime(0, date_of_creation)
  }
}


/**
 * Creates details per flight
 * @param {Record<string, string | number>} param0
 * @returns {Record<string, string | number>}
 */
const createDetails = ({ rank, price }, flightId) => (deleteUndefined({
  flightId,
  type: rank,
  amount: 1,
  price,
  AllTicketPrice: price
}))

/**
 * Create new flight object with tickets and total price per flight
 * @param {Record<string, string | number>} curr
 * @returns {Record<string, string | number | Record<string, string | number>[]>}
 */
const createItem = (data) => ({
  flightId: data.flight,
  totalPrice: data.price,
  totalAmount: 1,
  details: [createDetails(data)]
})


module.exports = {
  creteCommonSchema,
  createBody,
  setMinimalTime,
  countTicketAmoutn: countTicketAmount,
  createDetails,
  createItem
}
