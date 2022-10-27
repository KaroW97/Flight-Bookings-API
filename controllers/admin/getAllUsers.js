const { userService } = require('../../services/index')
const { messages } = require('../../utils/index')

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getUsersByRole()

    res.send(messages.success(users))
  } catch (error) {
    res.json(messages.error(error))
  }
}
