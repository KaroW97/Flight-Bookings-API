const Ticket = require('../models/Ticket')
const { queryUtils, common } = require('../utils/index')
const userService = require('./user')
const validate = require('../validation/validation')

exports.getTicketById = async (id) => {
  const ticket = await Ticket.findById(id)

  validate.checkIfTicketExists(ticket)

  return ticket
}

exports.getAndSortTickets = async (user) => {
  const tickets = await Ticket.find({ user })

  validate.checkIfTicketExists(tickets.length)

  const sorted = common.sortString(tickets)

  return sorted
}

exports.noReptTickets = (tickets) => {
  const flightIds = tickets.map((item) => item.flight.toString())

  return [...new Set(flightIds)]
}

exports.getTickets = async (bookedTicketsIds) => {
  const query = queryUtils.findTicketsById(bookedTicketsIds)

  const tickets = await Ticket.find(query)

  validate.checkIfTicketExists(tickets.length)

  const sorted = common.sortString(tickets)

  return sorted
}

exports.groupTickets = (tickets) => {
  const initialSort = tickets.reduce((prev, flight, index) => {
    const firstElem = prev[0] || undefined

    if (index === 0) {
      prev.push(common.createDetails(flight, flight.flight))

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

    prev.unshift(common.createDetails(flight, flight.flight))

    return prev
  }, [])

  return initialSort
}

exports.createNewTicket = async ({ tickets, flights, _id, randomIndex }) =>
  Promise.all(
    Object.entries(tickets).map(async ([key, value]) => {
      for (let i = 0; i < value; i++) {
        const ticket = {
          flight: flights[randomIndex]._id,
          user: _id,
          rank: key,
          price: flights[randomIndex].ticket_prices[key].price
        }

        const newTicket = await Ticket.create(ticket)

        await userService.addNewTicketToUser(newTicket, _id)
      }
      return {
        type: key,
        amount: value,
        price: flights[randomIndex].ticket_prices[key].price
      }
    })
  )

exports.findManyTicketsAndDelete = async (user) => {
  const tickets = await Ticket.find({ user })

  const ids = tickets.map((item) => item._id)

  const query = queryUtils.findTicketsById(ids)

  await Ticket.deleteMany(query)
}

exports.findTicketAndDelete = async (_id) => {
  const ticket = await Ticket.findOneAndDelete({ _id })

  validate.checkIfTicketExists(ticket)

  return ticket
}

exports.deleteMany = (userId) => Ticket.deleteMany({ user: userId })
