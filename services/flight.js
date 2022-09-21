const queryUtils = require('./mongo/queryUtils')
const Flight = require('../models/Flight')

exports.createFlight = (flight) => Flight.create(flight)

exports.deleteFlight = async ({ id }) => {
  const flight = await Flight.findOneAndDelete({ id })
  console.log(flight)
  if (!flight) throw new Error('No flights')

  return flight
}

exports.updateFlight = async (data, id) => {
  // Update statement
  const { filter, update } = queryUtils.updateFlight({ data, id })

  // Update
  await Flight.updateOne(filter, update)
}

exports.getAllFlights = async () => {
  const flights = await Flight.find()

  if (!flights.length) throw new Error('No flights')

  return flights
}

exports.getFlightById = async ({ id }) => {
  const flight = await Flight.findById(id)

  if (!flight) throw new Error('No flight was found')

  return flight
}

exports.updateFlightAndGetPrice = async (newRank, { rank, flight }) => {
  const update = queryUtils.updateFlightAmount(newRank, rank)

  const updatedFlight = await Flight.findByIdAndUpdate(flight, update)

  if (!updatedFlight) throw new Error('No flight')

  return updatedFlight.ticket_prices[newRank].price
}

exports.getFlights = async (ticketsIds) => {
  const query = queryUtils.findTicketsById(ticketsIds)

  const flights = await Flight.find(query)

  if (!flights.length) throw new Error('No flights')

  return flights
}

exports.getAvailableFlightsToBook = async (tickets) => {
  const { filter } = queryUtils.getFlightsToBeBooked(tickets)

  const flights = await Flight.find(filter)

  if (!flights.length) throw new Error('No flights')

  return flights
}

exports.updateFlightAccessibility = async (tickets, flight) => {
  const ticketTotalAmount = Object.values(tickets).reduce(
    (prev, curr) => prev + curr,
    0
  )

  const { filter, update } = queryUtils.updateFlightAccessibility({
    ticketTotalAmount,
    tickets,
    flight
  })

  await Flight.updateOne(filter, update)
}
