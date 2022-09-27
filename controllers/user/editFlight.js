const { flightService, ticketService } = require('../../services/index')
const { validation } = require('../../validation/index')
const { message } = require('../../utils/index')

exports.editFlight = async ({ body }, res) => {
  try {
    const { id, rank } = body

    const ticket = await ticketService.getTicketById(id)

    validation.checkIfRankChanged(rank, ticket.rank)

    const newPrice = await flightService.updateFlightAndGetPrice(rank, ticket)

    await ticket.updateOne({ rank, price: newPrice })

    res.send(
      message.success({
        ...ticket._doc,
        price: newPrice,
        rank
      })
    )
  } catch (error) {
    res.json(message.error(error))
  }
}
