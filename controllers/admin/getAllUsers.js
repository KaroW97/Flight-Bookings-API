const { messages } = require('../../utils/index')
const { userService } = require('../../services/index')

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getUsersByRole()

    res.send(messages.success(users))
  } catch (error) {
    res.json(messages.error(error))
  }
}
