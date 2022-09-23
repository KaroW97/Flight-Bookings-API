const { queries, MongoQuery } = require('./Query')
const mongoQuery = new MongoQuery()
const { generateQuery } = require('./queryHelpers')

/**
 * Update flight data
 * @param { Record < string, unknown > } param0
 * @returns { Record < string, unknown >}
 */
exports.updateFlight = ({ data, id }) => {
  const query = mongoQuery

  query.queryPlain(['_id', id])

  Object.entries(data).forEach(([key, value]) => query.querySet([key, value]))

  return generateQuery(query.build())
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

  return generateQuery(query.build())
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

  return generateQuery(query.build())
}

exports.updateFlightAccessibility = ({
  ticketTotalAmount,
  tickets,
  flight
}) => {
  const query = mongoQuery.queryPlain(['_id', flight._id])

  Object.entries(tickets).forEach(([key, value]) => {
    query.querySet([
      `ticket_prices.${key}.amount`,
      { operationType: 'PAIR', size: -value }
    ])
  })

  query.querySet([
    'number_of_available_tickets',
    { operationType: 'PAIR', size: -ticketTotalAmount, final: true }
  ])

  return generateQuery(query.build())
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

/**
 * Returns query for getting element with proper "vin" and "registration_number"
 * then set "currentRun", "mileage" and "fuelLevel" to proper values
 * and add value to bookingHistory
 * @param {string} param0
 * @param {Record<string, unknown>} share
 * @returns {Record<string, unknown>}
 */
exports.addNewTicketToUser = ({ newTicket, _id }) => {
  const filter = mongoQuery
    .queryPlain(['_id', _id])
    .queryPush(['booked_tickets', newTicket])
    .build()

  return generateQuery(filter)
}

exports.findTicketsById = (array, key = '_id') => {
  const filter = mongoQuery.queryPlain([key, queries.IN(array)]).build()

  return filter.$plain
}

exports.deleteItemFromArray = (userId, ticketId) => {
  const filter = mongoQuery
    .queryAnd(['_id', userId])
    .queryAnd(['booked_tickets', ticketId])
    .queryPull(['booked_tickets', ticketId])
    .build()

  return generateQuery(filter)
}
