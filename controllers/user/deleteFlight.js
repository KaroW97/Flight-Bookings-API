const userService = require('../../services/user')
const ticketService = require('../../services/ticket')
const message = require('../../utils/message')

exports.deleteFlight = async ({ user, body }, res) => {
  try {
    const ticket = await ticketService.findTicketAndDelete(body.id)

    await userService.deleteItemFromBookedArray(user.id, body.id)

    res.send(message.success(ticket))
  } catch (error) {
    res.status(404).send(message.error(error))
  }
}
