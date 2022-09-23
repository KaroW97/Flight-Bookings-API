const { userService, ticketService } = require('../../services/index')
const { message } = require('../../utils/index')

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
