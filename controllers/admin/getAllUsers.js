const User = require('../../models/User')
const messages = require('../../utils/message')

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'User' })

    if (!users) throw new Error('There is no users to be found')

    res.send(messages.success(users))
  } catch (error) {
    res.json(messages.error(error))
  }
}
