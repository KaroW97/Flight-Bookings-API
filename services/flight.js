const queryUtils = require('./mongo/queryUtils')
const Flight = require('../models/Flight')
const validate = require('../validation/validation')

exports.createFlight = (flight) => Flight.create(flight)

exports.deleteFlight = async ({ id }) => {
  const flight = await Flight.findOneAndDelete({ id })

  validate.checkIfFlightExists(flight)

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

  validate.checkIfFlightExists(flights.length)

  return flights
}

exports.getFlightById = async ({ id }) => {
  const flight = await Flight.findById(id)

  validate.checkIfFlightExists(flight)

  return flight
}

exports.updateFlightAndGetPrice = async (newRank, { rank, flight }) => {
  const update = queryUtils.updateFlightAmount(newRank, rank)

  const updatedFlight = await Flight.findByIdAndUpdate(flight, update)

  validate.checkIfFlightExists(updatedFlight)

  return updatedFlight.ticket_prices[newRank].price
}

exports.getFlights = async (ticketsIds) => {
  const query = queryUtils.findTicketsById(ticketsIds)

  const flights = await Flight.find(query)

  validate.checkIfFlightExists(flights.length)

  return flights
}

exports.getAvailableFlightsToBook = async (tickets) => {
  const { filter } = queryUtils.getFlightsToBeBooked(tickets)

  const flights = await Flight.find(filter)

  validate.checkIfFlightExists(flights.length)

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

exports.getAvailableFlights = async () => {
  const query = queryUtils.getAvailableFlights()

  const flights = await Flight.find(query)

  validate.checkIfFlightExists(flights.length)

  return flights
}
