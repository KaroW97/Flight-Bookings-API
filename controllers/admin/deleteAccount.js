const message = require('../../utils/message')
const userService = require('../../services/user')
const ticketService = require('../../services/ticket')

exports.deleteAccount = async ({ body }, res) => {
  try {
    const { id } = body

    await ticketService.findManyTicketsAndDelete(id)

    const user = await userService.findByIdAndDelete(id)

    res.send(message.success(user))
  } catch (error) {
    res.status(400).json(message.error(error))
  }
}
