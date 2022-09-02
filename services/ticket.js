const Ticket = require('../models/Ticket')
const queryUtils = require('./mongo/queryUtils')
const { sortString, createDetails } = require('../utils/common')

exports.getTicketById = async (id) => {
  const ticket = await Ticket.findById(id)

  if (!ticket) throw new Error('No ticket')

  return ticket
}

exports.getAndSortTickets = async (user) => {
  const tickets = await Ticket.find({ user })

  if (!tickets) throw new Error('No ticket')

  const sorted = sortString(tickets)

  return sorted
}

exports.findTicketAndDelete = async (id) => {
  const ticket = await Ticket.findOneAndDelete({ _id: id })

  if (!ticket) throw new Error('Ticket not found')

  return ticket
}

exports.noReptTickets = (tickets) => {
  const flightIds = tickets.map((item) => item.flight.toString())

  return [...new Set(flightIds)]
}

exports.getTickets = async (bookedTicketsIds) => {
  const query = queryUtils.findTicketsById(bookedTicketsIds)

  const tickets = await Ticket.find(query)

  if (!tickets) throw new Error('No tickets')

  const sorted = sortString(tickets)

  return sorted
}

exports.groupTickets = (tickets) => {
  const initialSort = tickets.reduce((prev, flight, index) => {
    const firstElem = prev[0] || undefined

    if (index === 0) {
      prev.push(createDetails(flight, flight.flight))

      return prev
    }

    // When rank are align update existing element in array
    if (
      firstElem &&
      flight.rank === firstElem.rank &&
      flight.flight.toString() === firstElem.flightId
    ) {
      firstElem.ticketIds.push(flight._id)

      firstElem.AllTicketPrice += flight.price

      firstElem.amount += 1

      return prev
    }

    prev.unshift(createDetails(flight, flight.flight))

    return prev
  }, [])

  return initialSort
}

exports.deleteMany = (userId) => Ticket.deleteMany({ user: userId })
