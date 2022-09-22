const messages = require('../../utils/message')
const userService = require('../../services/user')

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getUsersByRole()

    res.send(messages.success(users))
  } catch (error) {
    res.json(messages.error(error))
  }
}
