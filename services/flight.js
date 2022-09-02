const queryUtils = require('./mongo/queryUtils')
const Flight = require('../models/Flight')

exports.updateFlightAndGetPrice = async (newRank, { rank, flight }) => {
  const update = queryUtils.updateFlightAmount(newRank, rank)

  const updatedFlight = await Flight.findByIdAndUpdate(flight, update)

  if (!updatedFlight) throw new Error('No flight')

  return updatedFlight.ticket_prices[newRank].price
}

exports.getFlights = async (ticketsIds) => {
  const query = queryUtils.findTicketsById(ticketsIds)

  const flights = await Flight.find(query)

  if (!flights) throw new Error('No flight')

  return flights
}
