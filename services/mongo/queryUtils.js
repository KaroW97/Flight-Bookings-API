const { queries, MongoQuery } = require('./Query')
const mongoQuery = new MongoQuery()
const { createUpdateQuery } = require('./queryHelpers')

/**
 * Update flight data
 * @param { Record < string, unknown > } param0
 * @returns { Record < string, unknown >}
 */
exports.updateFlight = ({ data, id }) => {
  const query = mongoQuery

  query.queryPlain(['_id', id])

  Object.entries(data).forEach(([key, value]) => query.querySet([key, value]))

  return createUpdateQuery(query.build())
}

/**
 * Returns query for getting elements with "status" Reserved
 * @returns {Record<string, unknown>}
 */
exports.getAvailableFlights = (amount = 1) =>
  mongoQuery
    .queryPlain(['number_of_available_tickets', queries.GTE(amount)])
    .build().$plain

/**
 * Returns query for getting elements with "status" Reserved
 * @returns {Record<string, unknown>}
 */
exports.getFlightsToBeBooked = (data) => {
  const query = mongoQuery

  Object.entries(data).forEach(([key, value], index, array) => {
    if (array.length === 1)
      mongoQuery.queryPlain([`ticket_prices.${key}.amount`, queries.GTE(value)])
    else
      mongoQuery.queryAnd([`ticket_prices.${key}.amount`, queries.GTE(value)])
  })

  return query.build()
}

/**
 * Update user account
 * @param { Record < string, unknown > } param0
 * @returns { Record < string, unknown >}
 */
exports.updateUser = ({ data, id }) => {
  const query = mongoQuery

  query.queryPlain(['_id', id ?? data.id])

  Object.entries(data).forEach(([key, value]) => {
    if (!['_id', 'id'].includes(key)) query.querySet([key, value])
  })

  return createUpdateQuery(query.build())
}

//TODO: Fix it can be don easier without checking for amount
exports.updateFlightAccessibility = ({
  ticketTotalAmount,
  tickets,
  flight
}) => {
  const query = mongoQuery.queryPlain(['_id', flight._id])

  Object.entries(tickets).forEach(([key, value]) => {
    const currentFlight = flight.ticket_prices[key].amount

    query.querySet([`ticket_prices.${key}.amount`, currentFlight - value])
  })
  //It can be inc passing only amount about wich it has to be decreased
  query.querySet([
    'number_of_available_tickets',
    flight.number_of_available_tickets - ticketTotalAmount
  ])
  return createUpdateQuery(query.build())
}

/**
 * Returns query for getting element with proper "vin" and "registration_number"
 * then set "currentRun", "mileage" and "fuelLevel" to proper values
 * and add value to bookingHistory
 * @param {string} param0
 * @param {Record<string, unknown>} share
 * @returns {Record<string, unknown>}
 */
exports.addNewTicketToUser = ({ newTickets, _id }) => {
  const filter = mongoQuery
    .queryPlain(['_id', _id])
    .queryPush(['booked_tickets', newTickets])
    .build()

  return createUpdateQuery(filter)
}

exports.findTicketsById = (array) => {
  const filter = mongoQuery.queryPlain(['_id', queries.IN(array)]).build()

  return filter.$plain
}

/**
 * Returns query for getting element with "mileage" >= 100000 or "car_info.date" <= 2017-01-01
 * then set "status" to "In Service"
 * @returns {Record<string, unknown>}
 */
exports.changeStatus = () => {
  const filter = mongoQuery
    .queryOr(['mileage', queries.GTE(100000)])
    .queryOr([
      'car_info.date',
      queries.LTE(new Date('2017-01-01').toISOString())
    ])
    .querySet(['status', 'In Service'])
    .build()

  return createUpdateQuery(filter)
}

exports.updateFlightAmount = (newRank, ticketRank) => {
  const filter = mongoQuery
    .queryPlain([
      `ticket_prices.${newRank}.amount`,
      { operationType: 'PAIR', size: -1 }
    ])
    .queryPlain([
      `ticket_prices.${ticketRank}.amount`,
      { operationType: 'PAIR', size: 1, final: true }
    ])
    .build()

  return filter.$plain
}

exports.deleteItemFromArray = (userId, ticketId) => {
  const filter = mongoQuery
    .queryAnd(['_id', userId])
    .queryAnd(['booked_tickets', ticketId])
    .queryPull(['booked_tickets', ticketId])
    .build()

  return createUpdateQuery(filter)
}
