const { flightService, ticketService } = require('../../services/index')
const { message } = require('../../utils/index')

exports.getFlights = async ({ user }, res) => {
  try {
    const { booked_tickets } = user

    const tickets = await ticketService.getTickets(booked_tickets)

    //get my flights
    const ticketIds = ticketService.noReptTickets(tickets)

    const flights = await flightService.getFlights(ticketIds)

    return res.send(message.success(flights))
  } catch (error) {
    res.json(message.error(error))
  }
}
