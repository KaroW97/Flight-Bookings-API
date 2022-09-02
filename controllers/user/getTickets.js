const ticketService = require('../../services/ticket')
const message = require('../../utils/message')

exports.getTickets = async ({ user }, res) => {
  try {
    const { id } = user

    const tickets = await ticketService.getAndSortTickets(id)

    const ticketsDetails = ticketService.groupTickets(tickets)

    res.send(message.success(ticketsDetails))
  } catch (error) {
    res.status(400).json(message.error(error))
  }
}
