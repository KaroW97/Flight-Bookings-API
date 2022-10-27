const { ticketService, userService } = require('../../services/index')
const { message } = require('../../utils/index')

exports.deleteFlight = async ({ user, body }, res) => {
  try {
    const ticket = await ticketService.findTicketAndDelete(body.id)

    await userService.deleteItemFromBookedArray(user.id, body.id)

    res.send(message.success(ticket))
  } catch (error) {
    res.status(404).send(message.error(error))
  }
}
