const userService = require('../../services/user')
const ticketService = require('../../services/ticket')
const message = require('../../utils/message')

exports.deleteAccount = async ({ user }, res) => {
  try {
    const { id } = user

    await userService.findByIdAndDelete(id)

    await ticketService.deleteMany(id)

    res.send(message.success(id))
  } catch (error) {
    res.status(400).json(message.error(error))
  }
}
